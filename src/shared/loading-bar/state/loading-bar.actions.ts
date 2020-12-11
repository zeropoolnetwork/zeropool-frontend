import { createAction as create } from 'typesafe-actions';

export const loadingBarActions = {
  addRequest: create('@loadingBar/addRequest')<void>(),
  removeRequest: create('@loadingBar/removeRequest')<void>(),
};
