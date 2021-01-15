import { Token } from "shared/models/token";

import { Wallet } from "wallet/state/models/wallet";

export const amountsHelper = {
  getAmountsForAllTakens: (tokens: Token[], wallets: Record<Token['symbol'], Wallet[]>): Record<Token['symbol'], number> => {
    const amounts: Record<Token['symbol'], number> = {};
    
    for (let token of tokens) {
      amounts[token.symbol] = 0;
    }
    
    for (let token of tokens) {
      for (let wallet of wallets[token.symbol]) {
        amounts[token.symbol] += wallet.amount;   
      }
    };

    return amounts;
  },

  getAmountsForToken: (token: Token, wallets: Wallet[]): Record<Token['symbol'], number> => ({
    [token.symbol]: wallets.reduce((accu, next) => accu += next.amount, 0),
  }),

  getAmountsForWallet: (token: Token, wallet: Wallet): Record<Token['symbol'], number> => ({
    [token.symbol]: wallet.amount,
  }),
};
