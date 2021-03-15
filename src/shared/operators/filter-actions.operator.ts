import { pipe } from 'rxjs'
import { filter } from 'rxjs/operators'
import { ActionCreator, isActionOf } from 'typesafe-actions'

/**
 * @todo check this operator, because it swallow
 * action payload type when used for single action
 */
export const filterActions = <T extends string>(...actionCreators: ActionCreator<T>[]) => {
  const isOneAction = actionCreators.length === 1
  const argument = isOneAction ? actionCreators[0] : actionCreators
  return pipe(filter(isActionOf(argument)))
}
