import { push } from 'connected-react-router';
import { CoinType } from 'zeropool-api-js';
import { from, Observable, of } from 'rxjs';
import { Epic, combineEpics } from 'redux-observable';
import { ActionType, isActionOf } from 'typesafe-actions';
import { switchMapTo, map, withLatestFrom, mapTo, filter, switchMap } from 'rxjs/operators';

import { filterActions } from 'shared/operators/filter-actions.operator';
import { Token } from 'shared/models/token';
import { Rate } from 'shared/models/rate';
import toast from 'shared/helpers/toast.helper';

import { getSeed, getSupportedTokens } from 'wallet/state/wallet.selectors';
import { mapRatesToTokens } from 'wallet/state/helpers/map-rates-to-tokens';
import { walletActions } from 'wallet/state/wallet.actions';
import { initHDWallet } from 'wallet/api/zeropool.api';
import { WalletView } from 'wallet/state/models/wallet-view';
import { RatesApi } from 'wallet/api/rates.api';

import { RootState } from 'state';

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
    switchMapTo((RatesApi.getRates() as Observable<Rate<Token>[]>).pipe(
      withLatestFrom(state$.pipe(map(getSupportedTokens))),
      map(([ratesData, tokens]) => mapRatesToTokens(ratesData, tokens)),
      map(rates => walletActions.getRatesSuccess(rates))
    )),
  );

  const redirectToTheWallet$: Epic = (
    action$: Observable<Actions>,
    state$: Observable<RootState>,
  ) => 
  action$.pipe(
    filter(isActionOf(walletActions.setSeed)),
    switchMapTo(of(push('/wallet'))),
  );

  const initWallet$: Epic = (
    action$: Observable<Actions>,
    state$: Observable<RootState>,
  ) =>
    action$.pipe(
      filter(isActionOf(walletActions.openBalanceView)),
      withLatestFrom(state$.pipe(map(getSeed)), state$.pipe(map(getSeed))),
      switchMap(([, seed, ]) => {
        if (seed) {
          const wallet = initHDWallet(seed, [ CoinType.ethereum, CoinType.near, CoinType.waves ]);
        
          return from(wallet.getBalances(10))
            .pipe(
              switchMap((balances) => {
                toast.success('Wellcome to ZPWallet!');
                
                return of(
                  walletActions.setBalances({balances}),
                );
              })
            )
        } else {
          toast.error('Seed phrase not set');

          return of(
            push('/welcome'),
            walletActions.setSeedError(),
          );
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
  initWallet$,
  openBalance$,
  resetAccount$,
  redirectToTheWallet$,
);
