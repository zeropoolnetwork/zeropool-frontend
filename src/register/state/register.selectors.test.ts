import { RegisterStage } from 'register/state/models/register-stage';
import { RegisterState } from 'register/state/register.reducer';
import { getRegisterSeed, getRegisterSeedConfirmed, getRegisterStage, getRegisterState, getShowSteps } from 'register/state/register.selectors';
import { RootState } from 'state';

describe('Register selectors', () => {
  const registerState: RegisterState = {
    stage: RegisterStage.IMPORT,
    seed: ['test'],
    seedConfirmed: false,
    showSteps: true,
  }

  const rootState: Partial<RootState> = {
    register: {...registerState},
  }

  it('selects register state', () => {
    expect(getRegisterState(rootState as RootState)).toEqual(registerState)
  });

  it('selects register stage', () => {
    expect(getRegisterStage(rootState as RootState)).toEqual(RegisterStage.IMPORT)
  });

  it('selects register seed', () => {
    expect(getRegisterSeed(rootState as RootState)).toEqual(registerState.seed)
  });

  it('selects register seedConfirmed', () => {
    expect(getRegisterSeedConfirmed(rootState as RootState)).toEqual(registerState.seedConfirmed)
  });

  it('selects show steps', () => {
    expect(getShowSteps(rootState as RootState)).toEqual(registerState.showSteps)
  });
});