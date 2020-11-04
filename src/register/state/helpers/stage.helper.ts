import { RegisterStage } from "../models/register-stage";

interface registerStageStateSlice {
  stage: RegisterStage | undefined;
  showSteps: boolean;
}

export const getPreviousStage = (currentStage?: RegisterStage): registerStageStateSlice => {
  if (currentStage === RegisterStage.IMPORT) {
    return {
      stage: undefined,
      showSteps: false,
    }
  }

  return {
    stage: currentStage === RegisterStage.STEP1 ? undefined : Number(currentStage) - 1,
    showSteps: [1, undefined].includes(currentStage) ? false : true,
  }
} 