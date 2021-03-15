import { createAction as create } from 'typesafe-actions'

export const registerActions = {
  stepBack: create('@register/stepBack')<void>(),

  startRegisterAccount: create('@register/startRegisterAccount')<void>(),
  generateSeed: create('@register/generateSeed')<void>(),
  submitSeed: create('@register/submitSeed')<void>(),
  confirmSeed: create('@register/confirmSeed')<void>(),
  register: create('@register/register')<string>(),
  reset: create('@register/reset')<void>(),

  startImportAccount: create('@register/startImportAccount')<void>(),
  importAccount: create('@register/importAccount')<{ seed: string[]; password: string }>(),
}
