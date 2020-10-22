import { Observable } from "rxjs";
import { ActionType } from 'typesafe-actions';
import { Epic, combineEpics } from "redux-observable";
import { tap, ignoreElements } from 'rxjs/operators';

import { wellcomePageActions } from "wellcome/state/wellcome-page.actions";

import { filterActions } from 'common/operators/filter-actions.operator';

import { RootState } from "shared/state";

type Actions = ActionType<typeof wellcomePageActions>;

const test1$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filterActions(wellcomePageActions.test1),
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
    filterActions(wellcomePageActions.test2),
    tap(payload => {
      console.log(payload);
    }),
  );

export const wellcomePageEpics: Epic = combineEpics(
  test1$,
  test2$,
)