import { http, RequestConfig } from "shared/http/http";
import { getHTTPData } from "shared/operators/get-http-data.operator";
import { Provider } from "shared/models/provider";
import { Token } from "shared/models/token";
import { Rate } from "shared/models/rate";

export const RatesApi = {
  getRates() {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
    const config: RequestConfig = {
      params: {
      },
      context: {
        noLoadingBar: true,
        provider: Provider.Marketcap,
      },
    };

    return http()
      .get<{ status: any, data: Rate<Token>[] }>(url, config)
      .pipe(getHTTPData());
  },
};
