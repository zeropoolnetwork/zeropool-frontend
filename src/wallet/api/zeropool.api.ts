import { HDWallet, CoinType, devConfig, Balance, Coin } from 'zeropool-api-js'
import { from, Observable, of } from 'rxjs'
import { Transaction } from 'zeropool-api-js/lib/coins/transaction'
import { catchError, map } from 'rxjs/operators'

import { Token } from 'shared/models'
import { nearBug } from 'shared/util/waves-bug'

import mocks from './mocks.json'
import { promiceErrorHandler } from 'wallet/api/promice-error.handler'
import { getEthTransactions } from './es.api'

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

const getNetworkFee = (token: Token) => {
  if (!hdWallet) {
    throw Error('API not available!')
  }

  const coin = hdWallet.getCoin(token.name as CoinType)

  if (!coin) {
    throw Error(`Can't estimate fee for ${token.symbol}`)
  }

  return from(coin.estimateTxFee()).pipe(
    catchError((err) => {
      if (nearBug(err)) {
        return of({ fee: 0 })
      }

      throw Error(err.message)
    })
  )
}

// tslint:disable-next-line: prettier
const getWalletTransactions = (token: Token, walletId: number, mocked = false): Observable<Transaction[]> => {
  if (!hdWallet) {
    throw Error('API not available!')
  }

  const coin = hdWallet.getCoin(token.name as CoinType)

  if (!coin) {
    throw Error(`Can't connect to ${token.symbol}`)
  }

  const tr =
    token.symbol === 'ETH'
      ? getEthTransactions(coin.getAddress(walletId)).catch(promiceErrorHandler<Transaction[]>([]))
      : coin.getTransactions(walletId, 10, 0).catch(promiceErrorHandler<Transaction[]>([]))

  return mocked
    ? of(mocks.transactions).pipe(map(mapTransactions(coin)))
    : from(tr).pipe(map(mapTransactions(coin)))
}

const transfer = (account: number, to: string, amount: number, token: Token) => {
  if (!hdWallet) {
    throw Error('API not available!')
  }

  const coin = hdWallet.getCoin(token.name as CoinType)

  if (!coin) {
    throw Error(`Can't estimate fee for ${token.symbol}`)
  }

  return from(coin.transfer(account, to, coin.toBaseUnit(amount.toString()))).pipe(
    catchError((err) => {
      console.log('Transfer error:')
      console.log(err)

      throw Error(err.message)
    })
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

const mapTransactions = (coin: Coin) => (transactions: Transaction[]) =>
  transactions.map((transaction) => ({
    ...transaction,
    amount: coin.fromBaseUnit(transaction.amount),
  }))
