import { Token, TokenSymbol } from "shared/models/token";
import { round } from "shared/util/round-number";

import { Wallet } from "wallet/state/models/wallet";

export const amountsHelper = {
  getAmountsForAllTakens: (tokens: Token[], wallets: Record<TokenSymbol, Wallet[]>): Record<TokenSymbol, number> => {
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

  getAmountsForWallet: (token: Token, wallet: Wallet): Record<TokenSymbol, number> => ({
    [token.symbol]: wallet.amount,
  }),
};
