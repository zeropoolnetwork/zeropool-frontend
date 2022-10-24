// tslint:disable: prettier
import { AnyAction } from 'redux'
import { Observable, of } from 'rxjs'
import { Epic, combineEpics } from 'redux-observable'
import { withLatestFrom, map, switchMap, filter } from 'rxjs/operators'

import { selectSeed } from 'register/state/register.selectors'

import { RootState } from 'state'
import { registerActions as actions } from 'register/state/register.reducer'
import { demoActions } from 'wallet/state/demo.reducer'
// tslint:enable: prettier

const importAccount = (action$: Observable<AnyAction>, state$: Observable<RootState>) =>
  action$.pipe(
    filter(actions.import.match),
    switchMap(({ payload }) => {
      const seed = payload.seed.join(' ')

      return of(actions.reset(), demoActions.setSeedAndPasword({ seed, password: payload.password, accountId: payload.accountId }))
    }),
  )

const register: Epic = (action$: Observable<AnyAction>, state$: Observable<RootState>) =>
  action$.pipe(
    filter(actions.register.match),
    withLatestFrom(state$.pipe(map(selectSeed))),
    switchMap(([{ payload }, seed]) => {
      return of(actions.reset(), demoActions.setSeedAndPasword({ seed: seed.join(' '), password: payload, accountId: '' }))
    }),
  )

export const registerEpics: Epic = combineEpics(importAccount, register)
