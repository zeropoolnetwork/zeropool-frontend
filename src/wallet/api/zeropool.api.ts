import { HDWallet, CoinType, devConfig, Balance, Coin } from 'zeropool-api-js'
import { from, Observable, of } from 'rxjs'
import { Transaction } from 'zeropool-api-js/lib/coins/transaction'
import { map } from 'rxjs/operators'

import { Token } from 'shared/models'
import { fixTimestamp } from 'shared/util/fix-timestamp'

import { promiceErrorHandler } from 'wallet/api/promice-error.handler'
import { getEthTransactions } from 'wallet/api/es.api'

import mocks from './mocks.json'

export let hdWallet: HDWallet | null = null
export let transaction$: Observable<Transaction> | null = null

function initHDWallet(seed: string, coins: CoinType[]): HDWallet {
  hdWallet = new HDWallet(seed, devConfig, coins)

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
    map((balances) => balances[0]),
    map((balance) => ({
      ...balance,
      balance: coin.fromBaseUnit(balance.balance),
    }))
  )
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

  const tr =
    token.symbol === 'ETH'
      ? from(
          getEthTransactions(coin.getAddress(walletId), mocked).catch(
            promiceErrorHandler<Transaction[]>([], e)
          )
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
      .catch(promiceErrorHandler<Transaction[]>([], e))
  )
}

export default {
  getAllBalances,
  getWalletBalance,
  getNetworkFee,
  getWalletTransactions,
  initHDWallet,
  transfer,
}

const convertValues = (coin: Coin) => (transactions: Transaction[]) =>
  transactions.map((transaction) => ({
    ...transaction,
    amount: coin.fromBaseUnit(transaction.amount),
    timestamp: fixTimestamp(transaction.timestamp),
  }))
