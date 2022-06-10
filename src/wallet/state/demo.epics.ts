// tslint:disable: prettier max-line-length
import { catchError, filter, from, map, mergeMap, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs'
import { combineEpics, Epic, ofType } from 'redux-observable'
import { PayloadAction } from '@reduxjs/toolkit'

import * as api from 'wallet/api/zeropool.api'
import { selectSeed } from 'wallet/state/wallet.selectors'
import { demoActions } from 'wallet/state/demo.reducer'

import { RootState } from 'state'

import toast from 'shared/helpers/toast.helper'
import { debug } from 'shared/operators/debug.operator'
import { isString } from 'shared/util/is'
// tslint:enable: prettier max-line-length

type Action$ = Observable<PayloadAction>
type State$ = Observable<RootState>

const resetAccount: Epic = (action$: Action$) =>
  action$.pipe(
    filter(demoActions.resetAccount.match),
    tap((a) => toast.success('Wallet reseted and data cleared')),
    map(() => demoActions.resetAccount(null)),
  )

const mint: Epic = (action$, state$) =>
  action$.pipe(
    filter(demoActions.mint.match),
    switchMap(({ payload }) =>
      from(api.mint(payload)).pipe(
        map((res) => demoActions.mintSuccess(payload)),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.mintFalure(errMsg))
        }),
      ),
    ),
  )

const initApi = (action$: Action$, state$: State$) =>
  action$.pipe(
    ofType(demoActions.initApi.type),
    withLatestFrom(state$.pipe(map(selectSeed))),
    filter(([, seed]) => seed !== null),
    map(([, seed]) => seed),
    filter(isString),
    switchMap((seed) =>
      from(
        api.init(
          seed,
          '123455678',
          // tokens.map((item) => item.name as CoinType),
        ),
      ).pipe(
        map(() => demoActions.initApiSuccess(null)),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.initApiFailure(errMsg))
        }),
      ),
    ),
  )

const getWalletBalance = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.updateBalances.match),
    mergeMap(() =>
      from(api.getRegularBalance()).pipe(
        map((balance) => demoActions.tokenAmount(balance)),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.updateBalancesFailure(errMsg))
        }),
      ),
    ),
  )

const getWalletAddress = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.getWalletAddress.match),
    mergeMap(() =>
      from(api.getRegularAddress()).pipe(
        map((address) => demoActions.getWalletAddressSuccess(address)),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.getWalletAddressFailure(errMsg))
        }),
      ),
    ),
  )

const refreshWalletAddress = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.initApiSuccess.match),
    mergeMap(() => of(
      demoActions.getWalletAddress(null),
      demoActions.updateBalances(null),
    )),
  )

export const demoEpics: Epic = combineEpics(
  initApi,
  mint,
  getWalletBalance,
  resetAccount,
  getWalletAddress,
  refreshWalletAddress,
)
