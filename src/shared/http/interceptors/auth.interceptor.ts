import { AxiosRequestConfig } from 'axios'
import { Store } from 'redux'

import { RequestConfig } from 'shared/http/http'
import { RootState } from 'state'
import { Provider } from 'shared/models/provider'

import providers from 'assets/settings/providers.json'

export const authInterceptor = (store: Store<RootState>) => (
  request: AxiosRequestConfig
): AxiosRequestConfig => {
  const { context } = request as RequestConfig

  if (!context?.provider) {
    return request
  }

  const authHeaders: Record<string, string>[] = []
  const provider: { authHeader: string; authValue: string } = providers[Provider[context.provider]]

  authHeaders[provider.authHeader] = provider.authValue

  return {
    ...request,
    headers: {
      ...request.headers,
      ...authHeaders,
    },
  }
}
