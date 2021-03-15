export type Token = {
  id: number
  name: string // CoinType from zeropool-api-js/src/coins/coin-type.ts
  symbol: string
}

export type TokenSymbol = Token['symbol']
export type TokenName = Token['name']
export type TokenId = Token['id']
