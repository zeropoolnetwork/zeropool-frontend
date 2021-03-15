import { TokenSymbol } from 'shared/models'

export const total = (
  amounts: Record<TokenSymbol, number>,
  rates: Record<TokenSymbol, number>,
  filter?: TokenSymbol
): number => {
  let t = 0

  for (const symbol in amounts) {
    if (amounts.hasOwnProperty(symbol) && rates.hasOwnProperty(symbol)) {
      if (filter && filter !== symbol) {
        continue
      }

      t += amounts[symbol] * rates[symbol]
    }
  }

  return t
}
