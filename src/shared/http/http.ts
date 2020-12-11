import { Store } from 'redux';
import axios, { Axios } from 'axios-observable';
import { AxiosRequestConfig } from 'axios';

import { authInterceptor } from 'shared/http/interceptors/auth.interceptor';
import { RootState } from 'state';
import { Provider } from 'shared/models/provider';
import {
  loadingBarErrorResponseInterceptor,
  loadingBarRequestInterceptor,
  loadingBarResponseInterceptor,
} from 'shared/http/interceptors/loading-bar.interceptor';

let instance: Axios | null = null;

export interface RequestConfig extends AxiosRequestConfig {
  context?: {
    noBasicHeaders?: boolean;
    noLoadingBar?: boolean;
    provider?: Provider;
  };
};

export const setupInterceptors = (
  instance: Axios,
  store: Store<RootState>,
): void => {
  instance.interceptors.request.use(loadingBarRequestInterceptor(store));
  instance.interceptors.request.use(authInterceptor(store));

  instance.interceptors.response.use(
    loadingBarResponseInterceptor(store),
    loadingBarErrorResponseInterceptor(store),
  );
};

export const http = (): Axios => {
  if (!instance) {
    instance = axios.create({});
  }

  return instance;
};
