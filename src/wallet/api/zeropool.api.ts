import { HDWallet, CoinType, devConfig } from 'zeropool-api-js';

export let hdWallet: HDWallet | null = null;

export function initHDWallet(seed: string, coins: { [key in CoinType]?: number[] }) {
  hdWallet = new HDWallet(seed, devConfig, coins);
}
