import { Observable } from "rxjs";
import { ActionType } from 'typesafe-actions';
import { Epic, combineEpics } from "redux-observable";
import { tap, ignoreElements } from 'rxjs/operators';

import { registerActions } from "register/state/register.actions";

import { filterActions } from 'common/operators/filter-actions.operator';

import { RootState } from "state";

type Actions = ActionType<typeof registerActions>;

const test1$: Epic = (
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

const test2$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filterActions(registerActions.finishRegister),
    tap(payload => {
      console.log(payload);
    }),
  );

export const registerEpics: Epic = combineEpics(
  test1$,
  test2$,
)