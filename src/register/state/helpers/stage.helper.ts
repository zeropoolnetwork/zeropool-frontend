import { RegisterStage } from 'register/state/models/register-stage';
import { RegisterState } from 'register/state/register.reducer';

interface registerStageStateSlice {
  stage: RegisterStage | undefined;
  showSteps: boolean;
  seed: string[];
}

export const getPreviousStage = (state: RegisterState): registerStageStateSlice => {
  if (state.stage === RegisterStage.IMPORT) {
    return {
      stage: undefined,
      showSteps: false,
      seed: [],
    }
  }

  return {
    stage: state.stage === RegisterStage.STEP1 ? undefined : Number(state.stage) - 1,
    showSteps: [1, undefined].includes(state.stage) ? false : true,
    seed: state.stage === RegisterStage.STEP2 ? [] : state.seed,
  }
} 