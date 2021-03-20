import { ActionCreatorBuilder } from 'typesafe-actions'
import { catchError } from 'rxjs/operators'
import { merge, of } from 'rxjs'

export const handleEpicError = (errorAction: ActionCreatorBuilder<string, string>, debug = false) =>
  catchError((error, caught) => {
    if (debug) {
      // tslint:disable-next-line: no-debugger
      debugger
    }

    return merge(of(errorAction(error.message)), caught)
  })
