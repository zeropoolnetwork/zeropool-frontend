import { Observable, pipe } from 'rxjs'
import { map, take, switchMap } from 'rxjs/operators'

export const takeSelector = <S, R>(state$: Observable<S>, selector: (state: S) => R) =>
  pipe(switchMap(() => state$.pipe(map(selector), take(1))))
