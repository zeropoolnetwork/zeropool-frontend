import { Rate } from 'shared/models/rate'
import { Token, TokenSymbol } from 'shared/models/token'
import { recordFromArray } from 'shared/util/from'

export const mapRatesToTokens = (
  rates: Rate<Token>[],
  tokens: Token[]
): Record<TokenSymbol, number> => {
  const result: Record<TokenSymbol, number> = {}
  const ratesMap = recordFromArray(rates, 'symbol')

  for (const token of tokens) {
    if (ratesMap[token.symbol]) {
      result[token.symbol] = ratesMap[token.symbol].quote.USD.price
    }
  }

  return result
}
