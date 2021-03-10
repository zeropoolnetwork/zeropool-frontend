import { TokenSymbol } from 'shared/models';

export const total = (
  amounts: Record<TokenSymbol, number>, 
  rates: Record<TokenSymbol, number>,
  filter?: TokenSymbol, 
): number => {
    let total = 0;

    for (let symbol in amounts) {
      if (amounts.hasOwnProperty(symbol) && rates.hasOwnProperty(symbol)) {
        if (filter && filter !== symbol) {
          continue;
        }

        total += amounts[symbol] * rates[symbol];
      }
    }

    return total;
}