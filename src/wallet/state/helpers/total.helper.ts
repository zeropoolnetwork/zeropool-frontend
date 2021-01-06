import { Token } from "shared/models/token";

export const totalHelper = (
  amounts: Record<Token['symbol'], number>, 
  rates: Record<Token['symbol'], number>
): number => {
    let total = 0;

    for (let symbol in amounts) {
      if (amounts.hasOwnProperty(symbol) && rates.hasOwnProperty(symbol)) {
        total += amounts[symbol] * rates[symbol];
      }
    }

    return total;
}