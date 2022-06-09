// tslint:disable: prettier max-line-length
import { filter, from, ignoreElements, map, Observable, switchMap, tap, withLatestFrom } from 'rxjs'
import { combineEpics, Epic, ofType } from 'redux-observable'
import { PayloadAction } from '@reduxjs/toolkit'

import * as api from 'wallet/api/zeropool.api'
import { selectSeed } from 'wallet/state/wallet.selectors'
import { demoActions } from 'wallet/state/demo.reducer'

import { RootState } from 'state'
import toast from 'shared/helpers/toast.helper'
import { debug } from 'shared/operators/debug.operator'
import { isString } from 'shared/util/is'
import toast from 'shared/helpers/toast.helper'
// tslint:enable: prettier max-line-length

type Action$ = Observable<PayloadAction>
type State$ = Observable<RootState>

const resetAccount$: Epic = (action$: Action$) =>
  action$.pipe(
    filter(demoActions.resetAccount.match),
    tap((a) => toast.success('Wallet reseted and data cleared')),
    map(() => demoActions.resetAccount(null)),
  )

const mint: Epic = (action$, state$) =>
  action$.pipe(
    filter(demoActions.mint.match),
    map(({ payload }) => demoActions.mintSuccess(+payload)),
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
        debug(),
        map(() => demoActions.updateBalances(null)),
      ),
    ),
  )

export const demoEpics: Epic = combineEpics(initApi, mint)
