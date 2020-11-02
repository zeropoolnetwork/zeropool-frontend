import { ActionType, createReducer } from 'typesafe-actions';

import { registerActions as actions } from 'register/state/register.actions';
import { RegisterStage } from './models/register-stage';
import { generateSeed } from './helpers/seed.helper';
import { getPreviousStage } from './helpers/stage.helper';

export interface registerState {
  stage: RegisterStage | undefined;
  seed: string[] | undefined;
  seedConfirmed: boolean;
  showSteps: boolean;
}

const initialState: registerState = {
  stage: undefined,
  seed: undefined,
  seedConfirmed: false,
  showSteps: false,
};

export const registerReducer = createReducer<
  registerState,
  ActionType<typeof actions>
>(initialState)
  .handleAction(actions.stepBack, state => ({
    ...state,
    ...getPreviousStage(state.stage),
  }))
  .handleAction(actions.startRegisterAccount, state => ({
    ...state,
    showSteps: true,
    stage: RegisterStage.STEP1,
  }))
  .handleAction(actions.generateSeed, (state, useExistedIfPresent) => ({
    ...state,
    seed: useExistedIfPresent ? (state.seed || generateSeed()) : generateSeed(),
    seedConfirmed: false,
    stage: RegisterStage.STEP2,
  }))
  .handleAction(actions.submitSeed, (state) => ({
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
    stage: undefined,
  }))
  .handleAction(actions.startImportAccount, state => ({
    ...state,
    hideSteps: true,
    stage: RegisterStage.IMPORT,
  }));

