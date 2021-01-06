import { Observable } from "rxjs";
import { ActionType } from 'typesafe-actions';
import { Epic, combineEpics } from "redux-observable";
import { switchMapTo, map, withLatestFrom, mapTo } from 'rxjs/operators';

import { filterActions } from 'shared/operators/filter-actions.operator';

import { getSupportedTokens } from "wallet/state/wallet.selectors";
import { mapRatesToTokens } from "wallet/state/helpers/map-rates-to-tokens";
import { walletActions } from "wallet/state/wallet.actions";
import { RatesApi } from "wallet/api/rates.api";

import { RootState } from "state";

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
    filterActions(walletActions.getRates),
    switchMapTo(RatesApi.getRates().pipe(
      withLatestFrom(state$.pipe(map(getSupportedTokens))),
      map(([{ status, data }, tokens]) => mapRatesToTokens(data, tokens)),
      map(data => walletActions.getRatesSuccess(data))
    )),
  );

export const walletEpics: Epic = combineEpics(
  getRates$,
  openBalance$,
)