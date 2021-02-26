import { Coin } from 'zeropool-api-js/lib/coins/coin';

export interface Token {
  id: number;
  name: string;
  symbol: string;
  coin?: Coin;
}

export type TokenSymbol = Token['symbol'];