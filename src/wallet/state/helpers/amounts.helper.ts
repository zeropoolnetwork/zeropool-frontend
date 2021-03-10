import { Token, TokenSymbol } from 'shared/models/token';
import { round } from 'shared/util/round-number';

import { Wallet } from 'wallet/state/models/wallet';
import { WalletView } from 'wallet/state/models';
import { WalletState } from 'wallet/state/wallet.reducer';

export const amountsHelper = {
  getAmountsForAllTakens: (tokens: Token[], wallets: Record<TokenSymbol, Wallet[]> | null): Record<TokenSymbol, number>|null => {
    if (!wallets) return null;
    
    const amounts: Record<TokenSymbol, number> = {};
    
    for (let token of tokens) {
      amounts[token.symbol] = 0;
    }
    
    for (let token of tokens) {
      let amount = 0;

      for (let wallet of wallets[token.symbol]) {
        amount += wallet.amount;   
      }

      amounts[token.symbol] = round(amount);
    };

    return amounts;
  },

  getAmountsForToken: (token: Token, wallets: Wallet[]): Record<TokenSymbol, number> => ({
    [token.symbol]: round(wallets.reduce((accu, next) => accu += next.amount, 0)),
  }),

  getAmountsForWallet: (wallet: Wallet | null): Record<TokenSymbol, number> => {
    
    return wallet ? ({ [wallet.address.symbol]: wallet.amount }) : {};
  },

  getAmounts: (state: WalletState) => {
    switch (state.activeView) {
      case WalletView.Wallets:
        return state.activeToken && state.wallets ? 
          amountsHelper.getAmountsForToken(state.activeToken, state.wallets[state.activeToken.symbol]) :
          state.amounts;
      case WalletView.Receive:
      case WalletView.Send:
      case WalletView.SendConfirmation:
      case WalletView.Address:
        return state.activeWallet && state.wallets && state.activeToken ? 
          amountsHelper.getAmountsForWallet(state.activeWallet):
          state.amounts;
      default:
        return amountsHelper.getAmountsForAllTakens(state.supportedTokens, state.wallets);
    }
  }
};
