import { ActionCreatorBuilder } from 'typesafe-actions'
import { catchError } from 'rxjs/operators'
import { merge, of } from 'rxjs'

const errorMessage = (title: string) =>
  `
    ${title}.
    Check the console for more details.
  `

export const handleEpicError = (
  errorAction: ActionCreatorBuilder<string, string>,
  title?: string,
) =>
  catchError((error, caught) => {
    console.error(error)

    return merge(of(errorAction(errorMessage(title ?? 'Unknown error'))), caught)
  })
