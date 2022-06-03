import { useNavigate } from 'react-router-dom'
import { AnyAction } from 'redux'
import { combineEpics, Epic } from 'redux-observable'
import { ignoreElements, Observable, tap } from 'rxjs'

import { filterActions } from 'shared/operators/filter-actions.operator'

import { RootState } from 'state'

// export const navigateTo = (action$: Observable<AnyAction>, state$: Observable<RootState>) =>
//   action$.pipe(
//     filterActions(navigate.to),
//     tap(({ payload }) => {
//       console.log(payload)
//       // let navigate = useNavigate()
//       // navigate(payload)
//     }),
//     ignoreElements(),
//   )

export const sharedEpics: Epic = combineEpics()