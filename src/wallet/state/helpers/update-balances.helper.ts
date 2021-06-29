import { CoinType, HDWallet } from 'zeropool-api-js'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { nearBug } from 'shared/util/waves-bug'
import { notImplemented } from 'shared/util/not-implemented'
import { Token, TokenSymbol } from 'shared/models/token'

import { Wallet } from 'wallet/state/models'

export const updateBalances = (
  hdWallet: HDWallet,
  wallets: Record<TokenSymbol, Wallet[]>,
  tokens: Token[],
): Observable<Record<string, Wallet[]>> => {
  const promices: Promise<string[]>[] = []
  const result: Record<string, Wallet[]> = {}

  tokens.forEach((token) => {
    const tokenWallets = wallets[token.symbol]
    const walletPromises: Promise<string>[] = []
    const coin = hdWallet?.getCoin(token.name as CoinType)

    if (!coin) {
      throw Error(`Can not access ${token.name} data!`)
    }

    tokenWallets.forEach((wallet) => {
      if (wallet.id !== 0) {
        walletPromises.push(
          coin
            .getBalance(wallet.id - 1)
            .catch((err) => {
              // Near Fix
              if (nearBug(err)) {
                return '0'
              }

              throw Error(err)
            })
            .then((balance) => {
              try {
                return coin.fromBaseUnit(balance)
              } catch (err) {
                // Waves Fix
                if (notImplemented(err)) {
                  return '0'
                }
                throw Error(err?.message)
              }
            }),
        )
      }
    })

    promices.push(Promise.all(walletPromises))
  })

  return from(Promise.all(promices)).pipe(
    map((balances) => {
      tokens.forEach((token, tokenIndex) => {
        result[token.symbol] = wallets[token.symbol].map((wallet, walletIndex) => {

          return {
            ...wallet,
            amount: walletIndex ? +balances[tokenIndex][walletIndex - 1] : wallet.amount,
          }
        })
      })

      return result
    }),
  )
}
