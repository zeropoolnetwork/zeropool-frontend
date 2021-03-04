import { HDWallet, CoinType, devConfig } from 'zeropool-api-js';

export let hdWallet: HDWallet | null = null;

export function initHDWallet(seed: string, coins: CoinType[]): HDWallet {
  hdWallet = new HDWallet(seed, devConfig, coins);
  return hdWallet;
}
