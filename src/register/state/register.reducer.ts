import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export const registerSlice = createSlice({
  name: 'register',
  initialState: initialRegisterState,
  reducers: {
    // REGISTER ACCOUNT
    startRegister: (state) => {
      state.stage = RegisterStage.STEP1
      state.showSteps = true
    },
    stepBack: (state) => {
      return { ...state, ...getPreviousStage(state) }
    },
    generateSeed: (state) => {
      state.seed = generateSeed()
      state.seedConfirmed = false
      state.stage = RegisterStage.STEP2
    },
    submitSeed: (state) => {
      state.seedConfirmed = true
      state.stage = RegisterStage.STEP3
    },
    confirmSeed: (state) => {
      state.seedConfirmed = true
      state.stage = RegisterStage.STEP4
    },
    register: (state, action: PayloadAction<string>) => {
      state.stage = undefined
      state.showSteps = false
    },
    // IMPORT ACCOUNT
    startImport: (state) => {
      state.stage = RegisterStage.IMPORT
      state.showSteps = false
    },
    import: (state, action: PayloadAction<{ seed: string[]; password: string }>) => {
      state.stage = undefined
      state.showSteps = false
    },
    // RESET
    reset: (state) => {
      return initialRegisterState
    },
  },
})
