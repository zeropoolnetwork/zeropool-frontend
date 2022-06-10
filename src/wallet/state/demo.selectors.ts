import { RootState } from 'state'

const selectDemoState = (state: RootState) => state.demo

export const selectTokenAmount = (state: RootState) => selectDemoState(state).tokenAmount
export const selectPrivateAmount = (state: RootState) => selectDemoState(state).privateAmount
export const selectMinting = (state: RootState) => selectDemoState(state).minting
