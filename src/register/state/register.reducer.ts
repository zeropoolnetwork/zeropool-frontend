import { ActionType, createReducer } from 'typesafe-actions';

import { registerActions as actions } from 'register/state/register.actions';
import { RegisterStage } from './models/register-stage';
import { generateSeed } from './helpers/seed.helper';
import { getPreviousStage } from './helpers/stage.helper';

export interface RegisterState {
  stage: RegisterStage | undefined;
  seed: string[];
  seedConfirmed: boolean;
  showSteps: boolean;
}

export const initialRegisterState: RegisterState = {
  stage: undefined,
  seed: [],
  seedConfirmed: false,
  showSteps: false,
};

export const registerReducer = createReducer<
  RegisterState,
  ActionType<typeof actions>
>(initialRegisterState)
  .handleAction(actions.stepBack, state => ({
    ...state,
    ...getPreviousStage(state),
  }))
  .handleAction(actions.startRegisterAccount, state => ({
    ...state,
    showSteps: true,
    stage: RegisterStage.STEP1,
  }))
  .handleAction(actions.generateSeed, state => ({
    ...state,
    seed: generateSeed(),
    seedConfirmed: false,
    stage: RegisterStage.STEP2,
  }))
  .handleAction(actions.submitSeed, state => ({
    ...state,
    seedConfirmed: false,
    stage: RegisterStage.STEP3,
  }))
  .handleAction(actions.confirmSeed, state => ({
    ...state,
    seedConfirmed: true,
    stage: RegisterStage.STEP4,
  }))
  .handleAction(actions.finishRegister, (state, password) => ({
    ...state,
    showSteps: false,
    stage: undefined,
  }))
  .handleAction(actions.startImportAccount, state => ({
    ...state,
    showSteps: false,
    stage: RegisterStage.IMPORT,
  }))
  .handleAction(actions.finishImportAccount, state => ({
    ...state,
    showSteps: false,
    stage: undefined,
  }));

