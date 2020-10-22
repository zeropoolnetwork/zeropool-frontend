
import { createAction as create } from 'typesafe-actions';

export const wellcomePageActions = {
  test1: create('@wellcomePageActions/test1')<void>(),
  test2: create('@wellcomePageActions/test2')<void>(),
};
