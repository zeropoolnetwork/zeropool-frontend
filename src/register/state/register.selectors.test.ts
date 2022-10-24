import { RegisterStage } from 'register/state/models/register-stage';
import { RegisterState } from 'register/state/register.reducer';
import {
  selectSeed,
  selectIsSeedConfirmed,
  selectStage,
  selectRegisterSlice,
  selectShowSteps,
  selectAccountId
} from 'register/state/register.selectors';
import { RootState } from 'state';

describe('Register selectors', () => {
  const registerState: RegisterState = {
    stage: RegisterStage.IMPORT,
    seed: ['test'],
    accountId: 'test',
    password: 'test',
    seedConfirmed: false,
    showSteps: true,
  }

  const rootState: Partial<RootState> = {
    register: { ...registerState },
  }

  it('selects register state', () => {
    expect(selectRegisterSlice(rootState as RootState)).toEqual(registerState)
  });

  it('selects register stage', () => {
    expect(selectStage(rootState as RootState)).toEqual(RegisterStage.IMPORT)
  });

  it('selects register seed', () => {
    expect(selectSeed(rootState as RootState)).toEqual(registerState.seed)
  });

  it('selects account id', () => {
    expect(selectAccountId(rootState as RootState)).toEqual(registerState.accountId)
  });

  it('selects register seedConfirmed', () => {
    expect(selectIsSeedConfirmed(rootState as RootState)).toEqual(registerState.seedConfirmed)
  });

  it('selects show steps', () => {
    expect(selectShowSteps(rootState as RootState)).toEqual(registerState.showSteps)
  });
});