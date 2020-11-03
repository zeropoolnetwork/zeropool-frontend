import { Observable } from "rxjs";
import { ActionType } from 'typesafe-actions';
import { Epic, combineEpics } from "redux-observable";
import { tap, ignoreElements } from 'rxjs/operators';

import { registerActions } from "register/state/register.actions";

import { filterActions } from 'common/operators/filter-actions.operator';

import { RootState } from "state";

type Actions = ActionType<typeof registerActions>;

const finishImportAccount$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filterActions(registerActions.finishImportAccount),
    tap(payload => {
      console.log(payload);
    }),
    ignoreElements(),
  );

const finishRegister$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filterActions(registerActions.finishRegister),
    tap(payload => {
      console.log(payload);
    }),
    ignoreElements(),
  );

export const registerEpics: Epic = combineEpics(
  finishImportAccount$,
  finishRegister$,
)