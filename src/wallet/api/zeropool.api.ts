import { HDWallet, CoinType, devConfig, Balance } from 'zeropool-api-js'
import { from, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { Transaction } from 'zeropool-api-js/lib/coins/transaction'

import { Token } from 'shared/models'
import { nearBug } from 'shared/util/waves-bug'

export let hdWallet: HDWallet | null = null
export let transaction$: Observable<Transaction> | null = null

export function initHDWallet(seed: string, coins: CoinType[]): HDWallet {
  hdWallet = new HDWallet(seed, devConfig, coins)

  return hdWallet
}

export const getWalletBalance = (token: Token, walletId: number) => {
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

export const getAllBalances = (amount: number, offset = 0) => {
  if (!hdWallet) {
    throw Error('API not available!')
  }

  return from(hdWallet.getBalances(amount, offset).catch(promiceErrorHandler({})))
}

export const getNetworkFee = (token: Token) => {
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

export const transfer = (account: number, to: string, amount: number, token: Token) => {
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

export const promiceErrorHandler = <T>(mock: T) => (err: Error) => {
  console.error('Api error:')
  console.error(err)

  return mock
}
