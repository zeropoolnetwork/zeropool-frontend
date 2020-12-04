import { Observable } from "rxjs";
import { Epic, combineEpics } from "redux-observable";
import { ActionType, isActionOf } from 'typesafe-actions';
import { tap, ignoreElements, withLatestFrom, filter, map } from 'rxjs/operators';

import { registerActions } from "register/state/register.actions";
import { getRegisterSeed } from "register/state/register.selectors";

import { filterActions } from 'common/operators/filter-actions.operator';

import { RootState } from "state";

type Actions = ActionType<typeof registerActions>;

const finishImportAccount$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filterActions(registerActions.finishImportAccount),
    tap(action => {
      console.log((action as any).payload);
    }),
    ignoreElements(),
  );

const finishRegister$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(isActionOf(registerActions.finishRegister)),
    withLatestFrom(state$.pipe(map(getRegisterSeed))),
    tap(([action, seed]) => {
      console.log({
        password: (action as any).payload,
        seed,
      });
    }),
    ignoreElements(),
  );

export const registerEpics: Epic = combineEpics(
  finishImportAccount$,
  finishRegister$,
)