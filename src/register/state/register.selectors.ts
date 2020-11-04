import { createSelector } from "reselect";

import { RootState } from "state";

export const getRegisterState = (state: RootState) => state.register;

export const getRegisterStage = createSelector(
  getRegisterState,
  state => state.stage,
);

export const getRegisterSeed = createSelector(
  getRegisterState,
  state => state.seed,
);

export const getRegisterSeedConfirmed = createSelector(
  getRegisterState,
  state => state.seedConfirmed,
);

export const getShowSteps = createSelector(
  getRegisterState,
  state => state.showSteps,
);