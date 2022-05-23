export type Token = {
  id: number
  name: string
  symbol: string
}

export type TokenSymbol = Token['symbol']
export type TokenName = Token['name']
export type TokenId = Token['id']
