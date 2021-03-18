import { HDWallet, CoinType, devConfig } from 'zeropool-api-js'
import { catchError, map, tap } from 'rxjs/operators'
import { from, of } from 'rxjs'

import { Token } from 'shared/models'
import { nearBug } from 'shared/util/waves-bug'

export let hdWallet: HDWallet | null = null

export function initHDWallet(seed: string, coins: CoinType[]): HDWallet {
  hdWallet = new HDWallet(seed, devConfig, coins)
  return hdWallet
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
    map((fee) => fee),
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
    tap((result) => {
      console.log('Transfer result:')
      console.log(result)
    }),
    catchError((err) => {
      console.log('Transfer error:')
      console.log(err)

      throw Error(err.message)
    })
  )
}
