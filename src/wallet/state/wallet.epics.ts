import { push } from 'connected-react-router';
import { CoinType } from 'zeropool-api-js';
import { Observable, of } from 'rxjs';
import { Epic, combineEpics } from 'redux-observable';
import { ActionType, isActionOf } from 'typesafe-actions';
import { switchMapTo, map, withLatestFrom, mapTo, filter, switchMap } from 'rxjs/operators';

import { filterActions } from 'shared/operators/filter-actions.operator';
import toast from 'shared/helpers/toast.helper';

import { getSupportedTokens } from 'wallet/state/wallet.selectors';
import { mapRatesToTokens } from 'wallet/state/helpers/map-rates-to-tokens';
import { walletActions } from 'wallet/state/wallet.actions';
import { initHDWallet } from 'wallet/api/zeropool.api';
import { RatesApi } from 'wallet/api/rates.api';

import { RootState } from 'state';
import { WalletView } from './models/wallet-view';

type Actions = ActionType<typeof walletActions>;

const openBalance$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filterActions(walletActions.openBalanceView),
    mapTo(walletActions.getRates()),
  )

const getRates$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(isActionOf(walletActions.getRates)),
    switchMapTo(RatesApi.getRates().pipe(
      withLatestFrom(state$.pipe(map(getSupportedTokens))),
      map(([{ status, data }, tokens]) => mapRatesToTokens(data, tokens)),
      map(data => walletActions.getRatesSuccess(data))
    )),
  );

const initHDWallet$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(isActionOf(walletActions.setSeed)),
    switchMap(action => {
      try {
        const seed = action.payload.seed;
        initHDWallet(seed, { [CoinType.ethereum]: [0], [CoinType.near]: [0] });
        toast.success('Seed accepted');

        return of(push('/wallet'), walletActions.setSeedSuccess({seed}));
      } catch (e) {
        toast.error(e.message);
        
        return of(walletActions.setSeedError());
      }
    }),
  );

  const resetAccount$: Epic = (
    action$: Observable<Actions>,
    state$: Observable<RootState>,
  ) =>
    action$.pipe(
      filter(isActionOf(walletActions.menu)),
      filter(action => action.payload === WalletView.Reset),
      switchMap(action => {
          toast.success('Wallet reseted and data cleared');
          
          return of(push('/welcome'), walletActions.resetAccount());
      }),
    );

export const walletEpics: Epic = combineEpics(
  getRates$,
  openBalance$,
  initHDWallet$,
  resetAccount$,
)
