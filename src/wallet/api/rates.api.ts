import { of } from 'rxjs'
import { map } from 'rxjs/operators'

import { http, RequestConfig } from 'shared/http/http'
import { getHTTPData } from 'shared/operators/get-http-data.operator'
import { Provider } from 'shared/models/provider'
import { Token } from 'shared/models/token'
import { Rate } from 'shared/models/rate'

import ratesMock from 'assets/mocks/rates.mock.json'
import proxy from 'assets/settings/proxy.json'

const useMock = true

export const RatesApi = {
  getRates() {
    const url = proxy.cors + `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`
    const config: RequestConfig = {
      params: {},
      context: {
        noLoadingBar: true,
        provider: Provider.Marketcap,
      },
      headers: {
        'X-CMC_PRO_API_KEY': '66b703ca-d01c-4977-8876-b42c09e8b99e',
      },
    }

    if (useMock) {
      return of(ratesMock.data)
    }

    return http()
      .get<{ status: any; data: Rate<Token>[] }>(url, config)
      .pipe(
        getHTTPData(),
        map(({ status, data }) => data),
      )
  },
}
