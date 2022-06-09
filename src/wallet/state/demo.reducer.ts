import { ActionCreatorWithoutPayload, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DemoState = {
  tokenAmount: number | undefined
  privateAmount: number | undefined
  minting: boolean
}

export const initialDemoState: DemoState = {
  tokenAmount: undefined,
  privateAmount: undefined,
  minting: false,
}

export const demoSlice = createSlice({
  name: 'demo',
  initialState: initialDemoState,
  reducers: {
    updateBalances: (state, action: PayloadAction<null>) => {
    },
    tokenAmount: (state, action) => {
      state.tokenAmount = action.payload
    },
    privateAmount: (state, action) => {
      state.privateAmount = action.payload
    },
    mint: (state, action) => {
      state.minting = true
    },
    mintSuccess: (state, action: PayloadAction<number>) => {
      state.minting = false
      state.tokenAmount = action.payload + (state.tokenAmount || 0)
    }
  }
})

export const demoActions = demoSlice.actions
export const demoReducer = demoSlice.reducer

