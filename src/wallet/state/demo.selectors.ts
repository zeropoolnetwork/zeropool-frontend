import { RootState as RS } from 'state'

const selectDemoState = (state: RS) => state.demo

export const selectPublicBalance = (state: RS) => selectDemoState(state).publicBalance
export const selectPrivateBalance = (state: RS) => selectDemoState(state).privateBalance
export const selectTokenBalance = (state: RS) => selectDemoState(state).tokenBalance
export const selectMinting = (state: RS) => selectDemoState(state).minting
export const selectWalletAddress = (state: RS) => selectDemoState(state).walletAddress
export const selectPrivateAddress = (state: RS) => selectDemoState(state).privateAddress
export const selectBackdrop = (state: RS) => selectDemoState(state).backdrop
export const selectDeposit = (state: RS) => selectDemoState(state).deposit
export const selectWithdraw = (state: RS) => selectDemoState(state).withdraw
export const selectTransfer = (state: RS) => selectDemoState(state).transfer
export const selectInitials = (state: RS) => selectDemoState(state).initials
export const selectReadiness = (state: RS) => selectDemoState(state).readiness
export const selectRecovery = (state: RS) => selectDemoState(state).recovery