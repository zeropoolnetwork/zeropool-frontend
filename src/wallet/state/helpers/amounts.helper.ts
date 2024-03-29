import { Token, TokenSymbol } from 'shared/models/token'
import { round } from 'shared/utils/round-number'

import { Wallet } from 'wallet/state/models/wallet'
import { WalletView } from 'wallet/state/models'
import { WalletState } from 'wallet/state/wallet.reducer'

export const amountsHelper = {
  getAmountsForAllTakens: (
    tokens: Token[],
    wallets: Record<TokenSymbol, Wallet[]> | null,
  ): Record<TokenSymbol, number> | null => {
    if (!wallets) return null

    const amounts: Record<TokenSymbol, number> = {}

    for (const token of tokens) {
      amounts[token.symbol] = 0
    }

    for (const token of tokens) {
      let amount = 0

      for (const wallet of wallets[token.symbol]) {
        amount += wallet.amount
      }

      amounts[token.symbol] = round(amount)
    }

    return amounts
  },

  getAmountsForToken: (token: Token, wallets: Wallet[]): Record<TokenSymbol, number> => ({
    [token.symbol]: round(wallets.reduce((accu, next) => (accu += next.amount), 0)),
  }),

  getAmountsForWallet: (wallet: Wallet | null): Record<TokenSymbol, number> => {
    return wallet ? { [wallet.token.symbol]: wallet.amount } : {}
  },

  getAmounts: (state: WalletState) => {
    switch (state.activeView) {
      case WalletView.Wallets:
        return state.activeToken && state.wallets
          ? amountsHelper.getAmountsForToken(
              state.activeToken,
              state.wallets[state.activeToken.symbol],
            )
          : state.amounts
      case WalletView.Receive:
      case WalletView.Send:
      case WalletView.SendConfirmation:
      case WalletView.Transactions:
        return state.activeWallet
          ? amountsHelper.getAmountsForWallet(state.activeWallet)
          : state.amounts
      default:
        return amountsHelper.getAmountsForAllTakens(state.supportedTokens, state.wallets)
    }
  },
}
