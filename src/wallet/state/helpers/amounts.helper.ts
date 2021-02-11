import { Token } from "shared/models/token";
import { round } from "shared/util/round-number";

import { Wallet } from "wallet/state/models/wallet";

export const amountsHelper = {
  getAmountsForAllTakens: (tokens: Token[], wallets: Record<Token['symbol'], Wallet[]>): Record<Token['symbol'], number> => {
    const amounts: Record<Token['symbol'], number> = {};
    
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

  getAmountsForToken: (token: Token, wallets: Wallet[]): Record<Token['symbol'], number> => ({
    [token.symbol]: round(wallets.reduce((accu, next) => accu += next.amount, 0)),
  }),

  getAmountsForWallet: (token: Token, wallet: Wallet): Record<Token['symbol'], number> => ({
    [token.symbol]: wallet.amount,
  }),
};
