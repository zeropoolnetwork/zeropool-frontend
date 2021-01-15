import { WalletView } from "wallet/state/models/wallet-view";
import { Wallet } from "../models/wallet";
import { WalletState } from "../wallet.reducer";
import { amountsHelper } from "./amounts.helper";

export const navigationHelper = {
  handleBackClick: (state: WalletState): WalletState => {

    switch (state.activeView) {
      case WalletView.Send:
        return state.activeToken && state.wallets ? {
          ...state,
          activeView: WalletView.Wallets,
          activeWallet: null,
          amounts: amountsHelper.getAmountsForToken(state.activeToken, state.wallets[state.activeToken.symbol]),
        } : state;

      case WalletView.SendConfirmation:
        return state.activeToken && state.activeWallet ? {
          ...state,
          activeView: WalletView.Wallets,
          amounts: amountsHelper.getAmountsForWallet(state.activeToken, state.activeWallet),
        } : state;

      case WalletView.Receive: 
        return state.activeToken && state.wallets ? {
          ...state,
          activeView: WalletView.Wallets,
          activeWallet: null,
          amounts: amountsHelper.getAmountsForToken(state.activeToken, state.wallets[state.activeToken.symbol]),
        } : state;

      default:
        return {
          ...state,
          activeView: WalletView.Balance,
          activeToken: null,
          activeWallet: null,
          amounts: amountsHelper.getAmountsForAllTakens(state.supportedTokens, state.wallets),
        };
    }
  },

  getReceiveView: (state: WalletState, wallet: Wallet) => ( 
    state.activeToken ? {
      ...state,
      activeView: WalletView.Receive,
      activeWallet: wallet,
      amounts: amountsHelper.getAmountsForWallet(state.activeToken, wallet),
    } : state
  ),

  getSendInitialView: (state: WalletState, wallet: Wallet) => ( 
    state.activeToken ? {
      ...state,
      activeView: WalletView.Send,
      activeWallet: wallet,
      amounts: amountsHelper.getAmountsForWallet(state.activeToken, wallet),
    } : state
  ),

  getBalanceView: (state: WalletState) => ({
    ...state,
    activeToken: null,
    activeView: WalletView.Balance,
    activeWallet: null,
    amounts: amountsHelper.getAmountsForAllTakens(state.supportedTokens, state.wallets),
  }),

};
