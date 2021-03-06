import { CoinType, HDWallet } from 'zeropool-api-js';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Token, TokenSymbol } from 'shared/models/token';

import { Wallet } from 'wallet/state/models';

export const updateBalances = (
  hdWallet: HDWallet, 
  wallets: Record<TokenSymbol, Wallet[]>,
  tokens: Token[],
): Observable<Record<string, Wallet[]>> => {
  const promices: Promise<string[]>[] = [];
  const result: Record<string, Wallet[]> = {};

  tokens.forEach(token => {
    const tokenWallets = wallets[token.symbol];
    const walletPromises: Promise<string>[] = [];
    const coin = hdWallet?.getCoin(token.name as CoinType);

    if (!coin) { throw Error(`Can not access ${token.name} data!`); }

    tokenWallets.forEach(wallet => {
      walletPromises.push(
        coin.getBalance(wallet.id)
          .catch(err => { 
            if (typeof(err?.message) === 'string' && err.message.includes('[-32000]')) {
              return '0';
            } 

            throw Error(err);
          })
          .then((balance) => balance)
      );
    });

    promices.push(Promise.all(walletPromises)); 
  });

  return from(Promise.all(promices)).pipe(
    map(balances => {
      tokens.forEach((token, tokenIndex) => {
        result[token.symbol] = wallets[token.symbol].map((wallet, walletIndex) => ({
          ...wallet,
          // amount: wallets[token.symbol][walletIndex].amount + 1, // for test purpose
          amount: +balances[tokenIndex][walletIndex],
        }));
      })

      return result;
    })
  )
};
