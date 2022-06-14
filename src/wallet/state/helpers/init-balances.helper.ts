import { Token, TokenSymbol } from 'shared/models'
import { isErrorWithMessage } from 'shared/utils/is-error-with-message'
import { notImplemented } from 'shared/utils/not-implemented'

import { Wallet } from 'wallet/state/models'
import { walletsHelper } from 'wallet/state/helpers/wallets.helper'

export const initBalances = (
  hdWallet: any,
  balances: Record<TokenSymbol, any[]>,
  tokens: Token[],
  account = 0,
): Record<TokenSymbol, Wallet[]> => {
  const wallets: Record<TokenSymbol, Wallet[]> = {}

  for (const token of tokens) {
    const tokenId = token.symbol
    const coin = hdWallet?.getCoin(token.name as any)
    wallets[tokenId] = []

    wallets[tokenId].push({
      account,
      address: '',
      id: 0,
      amount: 0,
      name: 'Private',
      token,
    })

    for (const [balanceDataIndex, balanceData] of Object.entries(balances[token.name])) {
      let amount
      const id = +balanceDataIndex + 1

      try {
        amount = coin
          ? +coin.fromBaseUnit((balanceData as any).balance)
          : +(balanceData as any).balance
      } catch (err) {
        if (isErrorWithMessage(err)) {
          if (notImplemented(err)) {
            amount = 0
          } else {
            throw Error(err.message)
          }
        } else {
          throw Error()
        }
      }

      wallets[tokenId].push({
        account,
        address: (balanceData as any).address,
        id,
        amount,
        name: `Wallet${token.symbol}${id}`,
        token,
      })
    }

    wallets[tokenId] = walletsHelper.reduceWallets(wallets[tokenId])
  }

  return wallets
}
