import { Rate } from "shared/models/rate";
import { Token } from "shared/models/token";
import { recordFromArray } from "shared/util/from";

export const mapRatesToTokens =
  (rates: Rate<Token>[], tokens: Token[]): Record<Token['name'], number> => {
    const result: Record<Token['name'], number> = {};
    const ratesMap = recordFromArray(rates, 'name');

    for (const token of tokens) {
      if (ratesMap[token.name]) {
        result[token.name] = ratesMap[token.name].quote.USD.price;
      }
    }

    return result;
  }