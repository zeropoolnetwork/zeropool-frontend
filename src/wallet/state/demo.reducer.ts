import { ActionCreatorWithoutPayload, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DemoState = {
  tokenAmount: number | undefined
  privateAmount: number | undefined
}

export const initialDemoState: DemoState = {
  tokenAmount: 0,
  privateAmount: 0,
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
  }
})

export const demoActions = demoSlice.actions
export const demoReducer = demoSlice.reducer

