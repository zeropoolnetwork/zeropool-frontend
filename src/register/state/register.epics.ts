import { Observable, of } from 'rxjs'
import { Epic, combineEpics } from 'redux-observable'
import { ActionType } from 'typesafe-actions'
import { withLatestFrom, map, switchMap } from 'rxjs/operators'

import { filterActions } from 'shared/operators/filter-actions.operator'

import { walletActions } from 'wallet/state/wallet.actions'
import { registerActions } from 'register/state/register.actions'
import { getRegisterSeed } from 'register/state/register.selectors'

import { RootState } from 'state'

type Actions = ActionType<typeof registerActions>

const importAccount$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filterActions(registerActions.importAccount),
    switchMap((action) => {
      const seed = action.payload.seed.join(' ')
      return of(registerActions.reset(), walletActions.setSeed(seed))
    }),
  )

const register$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filterActions(registerActions.register),
    withLatestFrom(state$.pipe(map(getRegisterSeed))),
    switchMap(([, seed]) => {
      return of(registerActions.reset(), walletActions.setSeed(seed.join(' ')))
    }),
  )

export const registerEpics: Epic = combineEpics(importAccount$, register$)
