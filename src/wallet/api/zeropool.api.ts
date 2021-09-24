import { HDWallet, CoinType, devConfig, Balance, Coin } from 'zeropool-api-js'
import { from, Observable, of } from 'rxjs'
import { Transaction } from 'zeropool-api-js/lib/coins/transaction'
import { map } from 'rxjs/operators'

import { Token } from 'shared/models'
import { fixTimestamp } from 'shared/util/fix-timestamp'

import { promiceErrorHandler } from 'wallet/api/promice-error.handler'
import { getEthTransactions } from 'wallet/api/es.api'

import transferParamsUrl from 'assets/transfer_params.bin'
import treeParamsUrl from 'assets/tree_update_params.bin'

import mocks from './mocks.json'

export let hdWallet: HDWallet | null = null
export let transaction$: Observable<Transaction> | null = null
export let config = devConfig as any

async function initHDWallet(seed: string, coins: CoinType[]): Promise<HDWallet> {
  config.transferParamsUrl = transferParamsUrl
  config.treeParamsUrl = treeParamsUrl

  // config.ethereum.contractAddress = '0x7d6748e900326c726C1daf6eD020D9dFc8fee2bA'
  config.ethereum.httpProviderUrl = 'http://127.0.0.1:7545'
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

  return from(
    coin
      .transfer(account, to, coin.toBaseUnit(amount.toString()))
      .catch(promiceErrorHandler<Transaction[]>([], e)),
  )
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
}

export default api
