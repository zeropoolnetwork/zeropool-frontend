import { CoinType, HDWallet } from 'zeropool-api-js'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { nearBug } from 'shared/util/near-bug'
import { notImplemented } from 'shared/util/not-implemented'
import { Token, TokenSymbol } from 'shared/models/token'
import { isErrorWithMessage } from 'shared/util/is-error-with-message'

import { Wallet } from 'wallet/state/models'
import { isPrivateTxsInplemented } from 'wallet/state/helpers/is-private-txs-implemented.helper'

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
      console.error(`Coin ${token.name} not found in wallet`)

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
                const bal = coin.fromBaseUnit(balance)

                return bal
              } catch (err) {
                // Waves Fix
                if (isErrorWithMessage(err)) {
                  if (notImplemented(err)) {
                    return '0'
                  }
                }

                throw Error()
              }
            }),
        )
      } else if (isPrivateTxsInplemented(wallet.token.symbol)) {
        walletPromises.push(
          coin
            .updatePrivateState()
            .then(async () => {
              const balances = await coin.getPrivateBalances()
              
              return balances[0];
            })
            .catch((err) => {
              // Near Fix
              if (nearBug(err)) {
                return '0';
              }

              throw Error(err)
            })
        )
      } else {
        walletPromises.push(Promise.resolve('0'))
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
            amount: walletIndex ? +balances[tokenIndex][walletIndex] : wallet.amount,
          }
        })
      })

      return result
    }),
  )
}
