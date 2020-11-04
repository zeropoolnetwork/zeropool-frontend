
import { createAction as create } from 'typesafe-actions';

export const registerActions = {
  stepBack: create('@register/stepBack')<void>(),

  startRegisterAccount: create('@register/startRegisterAccount')<void>(),
  generateSeed: create('@register/generateSeed')<void>(),
  submitSeed: create('@register/submitSeed')<void>(),
  confirmSeed: create('@register/confirmSeed')<void>(),
  finishRegister: create('@register/register')<{ password: string }>(),

  startImportAccount: create('@register/startImportAccount')<void>(),
  finishImportAccount: create('@register/importAccount')<{ seed: string[], password: string }>(),
};
