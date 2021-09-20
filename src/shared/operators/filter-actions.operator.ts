import { pipe } from 'rxjs'
import { filter } from 'rxjs/operators'
import { isActionOf, PayloadActionCreator } from 'typesafe-actions'

export const filterActions = <T extends string, P>(
  ...actionCreators: PayloadActionCreator<T, P>[]
) => pipe(filter(isActionOf(actionCreators)))
