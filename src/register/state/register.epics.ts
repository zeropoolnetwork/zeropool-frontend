import { AnyAction } from 'redux'
import { Observable, of } from 'rxjs'
import { Epic, combineEpics, ofType } from 'redux-observable'
import { withLatestFrom, map, switchMap } from 'rxjs/operators'

import { walletActions } from 'wallet/state/wallet.actions'
import { selectSeed } from 'register/state/register.selectors'

import { RootState } from 'state'
import { registerSlice } from 'register/state/register.reducer'


const rsa = registerSlice.actions
const importAccount = (action$: Observable<AnyAction>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(rsa.import.type),
    switchMap((action) => {
      const seed = action.payload.seed.join(' ')

      return of(rsa.reset(), walletActions.setSeed(seed))
    }),
  )

const register: Epic = (action$: Observable<AnyAction>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(rsa.register.type),
    withLatestFrom(state$.pipe(map(selectSeed))),
    switchMap(([, seed]) => {
      return of(rsa.reset(), walletActions.setSeed(seed.join(' ')))
    }),
  )

export const registerEpics: Epic = combineEpics(importAccount, register)
