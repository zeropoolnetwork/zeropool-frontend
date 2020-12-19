import { of } from 'rxjs';

import { http, RequestConfig } from 'shared/http/http';
import { getHTTPData } from 'shared/operators/get-http-data.operator';
import { Provider } from 'shared/models/provider';
import { Token } from 'shared/models/token';
import { Rate } from 'shared/models/rate';

import ratesMock from 'assets/mocks/rates.mock.json';
import proxy from 'assets/settings/proxy.json';

const useMock = true;

export const RatesApi = {

  getRates() {
    const url = proxy.cors + `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
    const config: RequestConfig = {
      params: {
      },
      context: {
        noLoadingBar: true,
        provider: Provider.Marketcap,
      },
    };

    if (useMock) {
      return of(ratesMock);
    }

    return http()
      .get<{ status: any, data: Rate<Token>[] }>(url, config)
      .pipe(getHTTPData());
  },
};
