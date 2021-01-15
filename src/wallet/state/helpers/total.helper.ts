import { Token } from "shared/models/token";

export const totalHelper = (
  amounts: Record<Token['symbol'], number>, 
  rates: Record<Token['symbol'], number>,
  filter?: Token['symbol'], 
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