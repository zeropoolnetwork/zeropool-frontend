import { deepFreeze } from "shared/util/deep-freeze";

import { registerActions as actions } from 'register/state/register.actions';

import { initialRegisterState, registerReducer, RegisterState } from "./register.reducer";

describe('Register reducer', () => {
  const initialState: RegisterState = deepFreeze(initialRegisterState);
  const seed = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  it('handles Generate Seed action', () => {
    const state = registerReducer(
      initialState,
      actions.generateSeed(),
    );

    expect(state.seed.length).toBe(12);
  });

  it('handles Submit Seed action', () => {
    const state = registerReducer(
      { ...initialState, seed },
      actions.submitSeed(),
    );

    expect(state.seed.length).toBe(12);
  });
});