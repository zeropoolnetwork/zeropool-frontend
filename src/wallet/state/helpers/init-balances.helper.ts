import { Balance, CoinType, HDWallet } from 'zeropool-api-js'

import { Token, TokenSymbol } from 'shared/models'
import { notImplemented } from 'shared/util/not-implemented'

import { Wallet } from 'wallet/state/models'
import { walletsHelper } from 'wallet/state/helpers/wallets.helper'

export const initBalances = (
  hdWallet: HDWallet,
  balances: Record<TokenSymbol, Balance[]>,
  tokens: Token[],
  account = 0
): Record<TokenSymbol, Wallet[]> => {
  const wallets: Record<TokenSymbol, Wallet[]> = {}

  for (const token of tokens) {
    const tokenId = token.symbol
    const coin = hdWallet?.getCoin(token.name as CoinType)
    wallets[tokenId] = []

    for (const [balanceDataIndex, balanceData] of Object.entries(balances[token.name])) {
      let amount
      try {
        amount = coin
          ? +coin.fromBaseUnit((balanceData as Balance).balance)
          : +(balanceData as Balance).balance
      } catch (err) {
        if (notImplemented(err)) {
          amount = 0
        } else {
          throw Error(err.message)
        }
      }

      wallets[tokenId].push({
        account,
        address: (balanceData as Balance).address,
        id: +balanceDataIndex,
        amount,
        name: `Wallet${tokenId}${balanceDataIndex}`,
        private: false,
        token,
      })
    }

    wallets[tokenId] = walletsHelper.reduceWallets(wallets[tokenId])
  }

  return wallets
}
