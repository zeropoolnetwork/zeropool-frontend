import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'state'

export const selectRegisterSlice = (state: RootState) => state.register

export const selectStage = createSelector(selectRegisterSlice, (state) => state.stage)

export const selectSeed = createSelector(selectRegisterSlice, (state) => state.seed)

export const selectIsSeedConfirmed = createSelector(
  selectRegisterSlice,
  (state) => state.seedConfirmed,
)

export const selectShowSteps = createSelector(
  selectRegisterSlice,
  (state) => state.showSteps,
)
