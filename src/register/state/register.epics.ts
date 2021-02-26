import { Observable, of } from "rxjs";
import { Epic, combineEpics } from "redux-observable";
import { ActionType, isActionOf } from 'typesafe-actions';
import { withLatestFrom, filter, map, switchMap } from 'rxjs/operators';

import { walletActions } from "wallet/state/wallet.actions";
import { registerActions } from "register/state/register.actions";
import { getRegisterSeed } from "register/state/register.selectors";

import { RootState } from "state";

type Actions = ActionType<typeof registerActions>;

const importAccount$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(isActionOf(registerActions.importAccount)),
    switchMap(action => {
      const seed = action.payload.seed.join(' ');
      return of(
        registerActions.reset(),
        walletActions.setSeed({seed}),
      );
    }),
  );

const register$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(isActionOf(registerActions.register)),
    withLatestFrom(state$.pipe(map(getRegisterSeed))),
    switchMap(([_action, seed]) => {
      return of(
        registerActions.reset(),
        walletActions.setSeed({ seed: seed.join(' ')}),
      );
    }),
  );

export const registerEpics: Epic = combineEpics(
  importAccount$,
  register$,
)