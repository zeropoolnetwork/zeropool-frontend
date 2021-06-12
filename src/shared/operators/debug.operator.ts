import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

export const debug = <T>() => {
  return (source: Observable<T>) => {
    return source.pipe(
      tap((x) => {
        /* tslint:disable-next-line */
        debugger
      }),
    )
  }
}
