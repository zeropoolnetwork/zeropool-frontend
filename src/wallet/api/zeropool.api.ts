import { catchError, map } from 'rxjs/operators';
import { from } from 'rxjs';
import { HDWallet, CoinType, devConfig } from 'zeropool-api-js';

import { Token } from 'shared/models';

export let hdWallet: HDWallet | null = null;

export function initHDWallet(seed: string, coins: CoinType[]): HDWallet {
  hdWallet = new HDWallet(seed, devConfig, coins);
  return hdWallet;
}

export function getNetworkFee(token: Token) {
  if (!hdWallet) { throw Error('API not available!') }

  const coin = hdWallet.getCoin(token.name as CoinType);
  
  if (!coin) { 
    throw Error(`Can't estimate fee for ${token.symbol}`) 
  }

  return from(coin.estimateTxFee())
    .pipe(
      map((fee) => fee),
      catchError((err) => { throw Error(err.message) }),
    )
}
