import { pipe } from 'rxjs'
import { tap } from 'rxjs/operators'

export const debuggerOperator = () => {
  return pipe(
    tap((x) => {
      /* tslint:disable-next-line */
      debugger
    })
  )
}
