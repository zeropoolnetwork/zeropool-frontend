import { Store } from 'redux'
import axios, { Axios } from 'axios-observable'
import { AxiosRequestConfig } from 'axios'

import { authInterceptor } from 'shared/http/interceptors/auth.interceptor'
import { RootState } from 'state'
import { Provider } from 'shared/models/provider'
import {
  loadingBarErrorResponseInterceptor,
  loadingBarRequestInterceptor,
  loadingBarResponseInterceptor,
} from 'shared/http/interceptors/loading-bar.interceptor'

let instance: Axios | null = null

export interface RequestConfig extends AxiosRequestConfig {
  context?: {
    noBasicHeaders?: boolean
    noLoadingBar?: boolean
    provider?: Provider
  }
}

export const setupInterceptors = (axi: Axios, store: Store<RootState>): void => {
  axi.interceptors.request.use(loadingBarRequestInterceptor(store))
  axi.interceptors.request.use(authInterceptor(store))

  axi.interceptors.response.use(
    loadingBarResponseInterceptor(store),
    loadingBarErrorResponseInterceptor(store)
  )
}

export const http = (): Axios => {
  if (!instance) {
    instance = axios.create({})
  }

  return instance
}
