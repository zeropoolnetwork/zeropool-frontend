import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Store } from 'redux'

import { RootState } from 'state'
import { RequestConfig } from 'shared/http/http'
import { loadingBarActions as actions } from 'shared/loading-bar/state/loading-bar.reducer'

export const loadingBarRequestInterceptor = (store: Store<RootState>) => (
  request: AxiosRequestConfig,
): AxiosRequestConfig => {
  const { context } = request as RequestConfig
  const noBar = !!context?.noLoadingBar

  if (!noBar) {
    store.dispatch(actions.addRequest())
  }

  return request
}

export const loadingBarResponseInterceptor = (store: Store<RootState>) => (
  response: AxiosResponse,
): AxiosResponse => {
  const { context } = response.config as RequestConfig
  const noBar = !!context?.noLoadingBar

  if (!noBar) {
    store.dispatch(actions.removeRequest())
  }

  return response
}

export const loadingBarErrorResponseInterceptor = (store: Store<RootState>) => (
  error: AxiosError,
): unknown => {
  const context = (error.config as RequestConfig)?.context
  const noBar = !!context?.noLoadingBar

  if (!noBar) {
    store.dispatch(actions.removeRequest())
  }

  throw error
}
