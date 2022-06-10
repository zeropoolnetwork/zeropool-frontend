import { RootState as RS } from 'state'

const selectDemoState = (state: RS) => state.demo

export const selectTokenAmount = (state: RS) => selectDemoState(state).tokenAmount
export const selectPrivateAmount = (state: RS) => selectDemoState(state).privateAmount
export const selectMinting = (state: RS) => selectDemoState(state).minting
export const selectWalletAddress = (state: RS) => selectDemoState(state).walletAddress
