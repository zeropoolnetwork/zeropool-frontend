import { Observable, pipe } from 'rxjs'
import { map, take, switchMapTo } from 'rxjs/operators'

export const takeSelector = <S, R>(state$: Observable<S>, selector: (state: S) => R) =>
  pipe(switchMapTo(state$.pipe(map(selector), take(1))))
