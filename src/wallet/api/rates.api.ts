import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs'

import { http, RequestConfig } from 'shared/http/http'
import { isObjectWithData } from 'shared/utils/is-object-with-data'
import { getHTTPData } from 'shared/operators/get-http-data.operator'
import { Rate, Token } from 'shared/models'
import { Provider } from 'shared/models/provider'

import ratesMock from 'mocks/rates.mock.json'
import proxy from 'assets/settings/proxy.json'

const useMock = true

export const RatesApi = {
  getRates(): Observable<Rate<Token>[]> {
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
      .get<Rate<Token>[]>(url, config)
      .pipe(
        getHTTPData(),
        map((resp) => (isObjectWithData<Rate<Token>[]>(resp) ? resp.data : [])),
      )
  },
}
