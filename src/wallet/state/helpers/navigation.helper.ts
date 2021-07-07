import { WalletState } from 'wallet/state/wallet.reducer'
import { amountsHelper } from 'wallet/state/helpers/amounts.helper'
import { WalletView, Wallet } from 'wallet/state/models'

export const navigationHelper = {
  handleBackClick: (state: WalletState): WalletState => {
    switch (state.activeView) {
      case WalletView.Send:
        return state.activeToken && state.wallets
          ? {
              ...state,
              activeView: WalletView.Wallets,
              activeWallet: null,
              amounts: amountsHelper.getAmountsForToken(
                state.activeToken,
                state.wallets[state.activeToken.symbol],
              ),
            }
          : state

      case WalletView.SendConfirmation:
        return state.activeToken && state.activeWallet
          ? {
              ...state,
              activeView: WalletView.Send,
              amounts: amountsHelper.getAmountsForWallet(state.activeWallet),
            }
          : state

      case WalletView.Receive:
        return state.activeToken && state.wallets
          ? {
              ...state,
              activeView: WalletView.Wallets,
              activeWallet: null,
              amounts: amountsHelper.getAmountsForToken(
                state.activeToken,
                state.wallets[state.activeToken.symbol],
              ),
            }
          : state

      case WalletView.Transactions:
        return state.activeToken && state.wallets
          ? {
              ...state,
              activeView: state.previousView || WalletView.Balance,
              activeToken: state.previousView ? state.activeToken : null,
              activeWallet: null,
              amounts: state.previousView
                ? amountsHelper.getAmountsForToken(
                    state.activeToken,
                    state.wallets[state.activeToken.symbol],
                  )
                : amountsHelper.getAmountsForAllTakens(state.supportedTokens, state.wallets),
            }
          : state

      default:
        return {
          ...state,
          activeView: WalletView.Balance,
          activeToken: null,
          activeWallet: null,
          amounts: amountsHelper.getAmountsForAllTakens(state.supportedTokens, state.wallets),
        }
    }
  },

  getReceiveView: (state: WalletState, wallet: Wallet) =>
    state.activeToken && state.wallets
      ? {
          ...state,
          activeView: WalletView.Receive,
          activeWallet: wallet,
          amounts: amountsHelper.getAmountsForWallet(wallet),
          previousView: state.activeView,
        }
      : state,

  getSendInitialView: (state: WalletState, wallet: Wallet) =>
    state.activeToken && state.wallets
      ? {
          ...state,
          activeView: WalletView.Send,
          activeWallet: wallet,
          amounts: amountsHelper.getAmountsForWallet(wallet),
          previousView: state.activeView,
        }
      : state,

  getBalanceView: (state: WalletState) => ({
    ...state,
    activeToken: null,
    activeView: WalletView.Balance,
    activeWallet: null,
    amounts: amountsHelper.getAmountsForAllTakens(state.supportedTokens, state.wallets),
  }),
}
