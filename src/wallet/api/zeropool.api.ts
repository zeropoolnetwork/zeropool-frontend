import { HDWallet, CoinType, devConfig, Balance, Coin, validateAddress, init } from 'zeropool-api-js'
import { from, Observable, of } from 'rxjs'
import { Transaction } from 'zeropool-api-js/lib/coins/transaction'
import { map } from 'rxjs/operators'
// @ts-ignore
import wasmPath from 'libzeropool-rs-wasm-web/libzeropool_rs_wasm_bg.wasm';
// @ts-ignore
import workerPath from 'zeropool-api-js/lib/worker.js?asset';
import { Config } from 'zeropool-api-js/lib/config';

import { fixTimestamp } from 'shared/util/fix-timestamp'
import { Token, TokenSymbol } from 'shared/models'

import { getEthTransactions } from 'wallet/api/es.api'
import { promiceErrorHandler } from 'wallet/api/promice-error.handler'

import transferParamsUrl from 'assets/transfer_params.bin'
import treeParamsUrl from 'assets/tree_update_params.bin'
  // @ts-ignore
import transferVk from 'assets/transfer_verification_key.json?asset'
  // @ts-ignore
import treeVk from 'assets/tree_update_verification_key.json?asset'

import mocks from './mocks.json'

export let hdWallet: HDWallet | null = null
export let transaction$: Observable<Transaction> | null = null
export let config: Config = devConfig as any

async function initHDWallet(seed: string): Promise<HDWallet> {debugger
  config.snarkParams = {
    transferParamsUrl: transferParamsUrl,
    treeParamsUrl: treeParamsUrl,
    transferVkUrl: transferVk,
    treeVkUrl: treeVk,
  }
  // @ts-ignore
  config.wasmPath = wasmPath
  config.workerPath = workerPath
  config.ethereum!.contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || ''
  config.ethereum!.tokenContractAddress = process.env.REACT_APP_TOKEN_ADDRESS || ''
  config.ethereum!.httpProviderUrl = process.env.REACT_APP_EVM_RPC || ''
  config.ethereum!.relayerUrl = process.env.REACT_APP_RELAYER_URL || ''
  console.log(config)

  await init(wasmPath)

  hdWallet = await HDWallet.init(seed, config)

  return hdWallet
}

const getWalletBalance = (token: Token, walletId: number) => {
  if (!hdWallet) {
    throw Error('API not available!')
  }

  const coin = hdWallet.getCoin(token.name as CoinType)

  if (!coin) {
    throw Error(`Can not access ${token.name} data!`)
  }

  return from(coin.getBalances(1, walletId).catch(promiceErrorHandler<Balance[]>([]))).pipe(
    map((balances: any[]) => balances[0]),
    map((balance: any) => ({
      ...balance,
      balance: coin.fromBaseUnit(balance.balance),
    })),
  )
}

const getPrivateAddress = (token: Token) => {
  if (!hdWallet) {
    throw Error('API not available!')
  }

  const coin = hdWallet.getCoin(token.name as CoinType)

  if (!coin) {
    throw Error(`Can't estimate fee for ${token.symbol}`)
  }

  return from([coin.generatePrivateAddress()])
}

const getAllBalances = (amount: number, offset = 0) => {
  if (!hdWallet) {
    throw Error('API not available!')
  }

  return from(hdWallet.getBalances(amount, offset).catch(promiceErrorHandler({})))
}

const getNetworkFee = (token: Token): Observable<{ fee: string }> => {
  if (!hdWallet) {
    throw Error('API not available!')
  }

  const coin = hdWallet.getCoin(token.name as CoinType)
  const e = `Can't estimate fee for ${token.name}`

  if (!coin) {
    throw Error(`Can't estimate fee for ${token.symbol}`)
  }

  return from(coin.estimateTxFee().catch(promiceErrorHandler<{ fee: string }>({ fee: '' }, e)))
}

// tslint:disable-next-line: prettier
const getWalletTransactions = (token: Token, walletId: number, mocked = false): Observable<Transaction[]> => {
  if (!hdWallet) {
    throw Error('API not available!')
  }

  const coin = hdWallet.getCoin(token.name as CoinType)
  const e = `Can't get transactions for ${token.name}`

  if (!coin) {
    throw Error(`Can't connect to ${token.symbol}`)
  }

  //#region TODO: Fix after implementing private transactions history
  if (walletId === 0) {
    return of([])
  }

  walletId -= 1
  //#endregion ---------------------------------------------------------

  const tr =
    token.symbol === 'ETH'
      ? from(
          getEthTransactions(coin.getAddress(walletId), mocked).catch(
            promiceErrorHandler<Transaction[]>([], e),
          ),
        )
      : mocked
      ? of(mocks.transactions[token.symbol])
      : from(coin.getTransactions(walletId, 10, 0).catch(promiceErrorHandler<Transaction[]>([], e)))

  return tr.pipe(map(convertValues(coin)))
}

const transfer = (account: number, to: string, amount: number, token: Token) => {
  if (!hdWallet) {
    throw Error('API not available!')
  }

  const coin = hdWallet.getCoin(token.name as CoinType)
  const e = `Can't transfer ${token.name}`

  if (!coin) {
    throw Error(`Can't estimate fee for ${token.symbol}`)
  }

  if (isPrivateAddress(to, token.symbol)) {
    if (isPrivateAddress(account.toString(), token.symbol)) {
      throw Error(`Not implemented.`)
      // return from(
      //   coin.updatePrivateState().then(() =>
      //     coin.withdrawPrivate(+to, amount.toString())
      //   )
      // )
    }
    
    return from(
      coin.updatePrivateState().then(() => {
        return coin.depositPrivate(account, coin.toBaseUnit(amount.toString()))

      }
      )
    )
  }

  if (isPrivateAddress(account.toString(), token.symbol)) {
    throw Error(`Private local to public remote transactions are not implemented.`)
  }

  return from(
    coin.transfer(account, to, coin.toBaseUnit(amount.toString())),
  )
}

export const isPrivateAddress = (address: string, token: TokenSymbol) => {
  if (!hdWallet) {
    throw Error('API not available!')
  }

  return validateAddress(address)
}

const convertValues = (coin: Coin) => (transactions: Transaction[]) =>
  transactions.map((transaction) => ({
    ...transaction,
    amount: coin.fromBaseUnit(transaction.amount),
    timestamp: fixTimestamp(transaction.timestamp),
  }))

export const api = {
  getAllBalances,
  getWalletBalance,
  getNetworkFee,
  getWalletTransactions,
  getPrivateAddress,
  initHDWallet,
  transfer,
  isPrivateAddress,
}
