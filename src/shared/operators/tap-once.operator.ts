import { defer, Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

export function tapOnce<T>(fn: (value: T) => void) {
  return (source: Observable<T>) =>
    defer(() => {
      let first = true

      return source.pipe(
        tap<T>((payload) => {
          if (first) {
            fn(payload)
          }
          first = false
        })
      )
    })
}
