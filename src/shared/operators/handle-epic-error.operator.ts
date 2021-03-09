import { ActionCreatorBuilder } from 'typesafe-actions';
import { catchError } from 'rxjs/operators';
import { merge, of } from 'rxjs';

export const handleEpicError = (errorAction: ActionCreatorBuilder<string, string>) =>
  catchError((error, caught) => 
    merge(of(errorAction(error.message)), caught)
  );
