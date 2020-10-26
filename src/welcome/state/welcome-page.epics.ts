import { Observable } from "rxjs";
import { ActionType } from 'typesafe-actions';
import { Epic, combineEpics } from "redux-observable";
import { tap, ignoreElements } from 'rxjs/operators';

import { welcomePageActions } from "welcome/state/welcome-page.actions";

import { filterActions } from 'common/operators/filter-actions.operator';

import { RootState } from "shared/state";

type Actions = ActionType<typeof welcomePageActions>;

const test1$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filterActions(welcomePageActions.test1),
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
    filterActions(welcomePageActions.test2),
    tap(payload => {
      console.log(payload);
    }),
  );

export const welcomePageEpics: Epic = combineEpics(
  test1$,
  test2$,
)