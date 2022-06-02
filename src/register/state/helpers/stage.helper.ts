import { RegisterStage } from 'register/state/models/register-stage'
import { RegisterState } from 'register/state/register.reducer'

type RegisterStageStateSlice = {
  stage: RegisterStage | undefined
  showSteps: boolean
  seed: string[]
}

export const getPreviousStage = (state: RegisterState): RegisterStageStateSlice => {
  if (state.stage === RegisterStage.IMPORT) {
    return {
      stage: undefined,
      showSteps: false,
      seed: [],
    }
  }

  const stage = state.stage === RegisterStage.STEP1 ? undefined : Number(state.stage) - 1
  const showSteps = [1, undefined].includes(state.stage) ? false : true
  const seed = state.stage === RegisterStage.STEP2 ? [] : state.seed

  return { stage, showSteps, seed }
}
