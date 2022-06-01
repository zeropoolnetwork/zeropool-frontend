import { ActionType, createReducer } from 'typesafe-actions'
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { registerActions as actions } from 'register/state/register.actions'
import { getPreviousStage } from 'register/state/helpers/stage.helper'
import { RegisterStage } from 'register/state/models/register-stage'
import { generateSeed } from 'register/state/helpers/seed.helper'

export type RegisterState = {
  stage: RegisterStage | undefined
  seed: string[]
  seedConfirmed: boolean
  showSteps: boolean
}

export const initialRegisterState: RegisterState = {
  stage: undefined,
  seed: [],
  seedConfirmed: false,
  showSteps: false,
}

export const registerReducer = createSlice({
  name: 'register',
  initialState: initialRegisterState,
  reducers: {
    // REGISTER ACCOUNT
    startRegister: (state, action: PayloadAction) => {
      state.stage = RegisterStage.STEP1
      state.showSteps = true
    },
    stepBack: (state, action: PayloadAction) => {
      state = { ...state, ...getPreviousStage(state) }
    },
    generateSeed: (state, action: PayloadAction) => {
      state.seed = generateSeed()
      state.seedConfirmed = false
      state.stage = RegisterStage.STEP2
    },
    submitSeed: (state, action: PayloadAction) => {
      state.seedConfirmed = true
      state.stage = RegisterStage.STEP3
    },
    confirmSeed: (state, action: PayloadAction) => {
      state.seedConfirmed = true
      state.stage = RegisterStage.STEP4
    },
    register: (state, action: PayloadAction<string>) => {
      state.stage = undefined
      state.showSteps = false
    },
    // IMPORT ACCOUNT
    startImportAccount: (state, action: PayloadAction) => {
      state.stage = RegisterStage.IMPORT
      state.showSteps = false
    },
    importAccount: (state) => {
      state.stage = undefined
      state.showSteps = false
    },
    // RESET
    reset: (state) => {
      state = initialRegisterState
    },
  },
})

/*
  .handleAction(actions.stepBack, (state) => ({
    ...state,
    ...getPreviousStage(state),
  }))
  .handleAction(actions.startRegisterAccount, (state) => ({
    ...state,
    showSteps: true,
    stage: RegisterStage.STEP1,
  }))
  .handleAction(actions.generateSeed, (state) => ({
    ...state,
    seed: generateSeed(),
    seedConfirmed: false,
    stage: RegisterStage.STEP2,
  }))
  .handleAction(actions.submitSeed, (state) => ({
    ...state,
    seedConfirmed: false,
    stage: RegisterStage.STEP3,
  }))
  .handleAction(actions.confirmSeed, (state) => ({
    ...state,
    seedConfirmed: true,
    stage: RegisterStage.STEP4,
  }))
  .handleAction(actions.register, (state, password) => ({
    ...state,
    showSteps: false,
    stage: undefined,
  }))
  .handleAction(actions.startImportAccount, (state) => ({
    ...state,
    showSteps: false,
    stage: RegisterStage.IMPORT,
  }))
  .handleAction(actions.reset, () => ({
    ...initialRegisterState,
  }))
  .handleAction(actions.importAccount, (state) => ({
    ...state,
    showSteps: false,
    stage: undefined,
  }))
*/
