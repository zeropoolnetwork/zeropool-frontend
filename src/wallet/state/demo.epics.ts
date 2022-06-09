import { combineEpics, Epic } from 'redux-observable';
import { filter, map } from 'rxjs';
import { demoActions } from 'wallet/state/demo.reducer';

const mint: Epic = (action$, state$) =>
    action$.pipe(
        filter(demoActions.mint.match),
        map(({ payload }) => demoActions.mintSuccess(+payload))
    )

export const demoEpics: Epic = combineEpics(mint)