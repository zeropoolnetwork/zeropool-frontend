import { Observable } from "rxjs";
import { Epic, combineEpics } from "redux-observable";
import { ActionType, isActionOf } from 'typesafe-actions';
import { withLatestFrom, filter, map } from 'rxjs/operators';

import { walletActions } from "wallet/state/wallet.actions";
import { registerActions } from "register/state/register.actions";
import { getRegisterSeed } from "register/state/register.selectors";

import { RootState } from "state";

type Actions = ActionType<typeof registerActions>;

const finishImportAccount$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(isActionOf(registerActions.finishImportAccount)),
    map(action => {
      const seed = action.payload.seed.join(' ');
      return walletActions.setSeed({seed});
    }),
  );

const finishRegister$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(isActionOf(registerActions.finishRegister)),
    withLatestFrom(state$.pipe(map(getRegisterSeed))),
    map(([_action, seed]) => {
      return walletActions.setSeed({ seed: seed.join(' ')});
    }),
  );

export const registerEpics: Epic = combineEpics(
  finishImportAccount$,
  finishRegister$,
)