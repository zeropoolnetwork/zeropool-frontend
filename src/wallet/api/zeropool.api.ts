import { HDWallet, CoinType, devConfig, Balance, Coin, validateAddress } from 'zeropool-api-js'
import { from, Observable, of } from 'rxjs'
import { Transaction } from 'zeropool-api-js/lib/coins/transaction'
import { map } from 'rxjs/operators'

import { fixTimestamp } from 'shared/util/fix-timestamp'
import { Token, TokenSymbol } from 'shared/models'

import { getEthTransactions } from 'wallet/api/es.api'
import { promiceErrorHandler } from 'wallet/api/promice-error.handler'

import transferParamsUrl from 'assets/tx_params.bin'
import treeParamsUrl from 'assets/tree_params.bin'
import transferVk from 'assets/tx_vk.json'
import treeVk from 'assets/tree_vk.json'
import addresses from 'assets/addresses.json'

import mocks from './mocks.json'

export let hdWallet: HDWallet | null = null
export let transaction$: Observable<Transaction> | null = null
export let config = devConfig as any

async function initHDWallet(seed: string, coins: CoinType[]): Promise<HDWallet> {
  config.snarkParams = {}
  config.snarkParams.transferParamsUrl = transferParamsUrl
  config.snarkParams.treeParamsUrl = treeParamsUrl;
  config.snarkParams.transferVk = transferVk;
  config.snarkParams.treeVk = treeVk;

  config.ethereum.contractAddress = addresses.pool;
  config.ethereum.tokenContractAddress = addresses.token;
  config.ethereum.httpProviderUrl = 'http://127.0.0.1:8545'
  console.log(config)

  hdWallet = await HDWallet.init(seed, config, coins)

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
        return coin.depositPrivate(account, amount.toString())

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

const isPrivateAddress = (address: string, token: TokenSymbol) => {
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

const api = {
  getAllBalances,
  getWalletBalance,
  getNetworkFee,
  getWalletTransactions,
  getPrivateAddress,
  initHDWallet,
  transfer,
  isPrivateAddress,
}

export default api
