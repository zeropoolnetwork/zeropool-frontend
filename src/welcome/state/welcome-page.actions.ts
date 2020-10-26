
import { createAction as create } from 'typesafe-actions';

export const welcomePageActions = {
  test1: create('@welcomePageActions/test1')<void>(),
  test2: create('@welcomePageActions/test2')<void>(),
};
