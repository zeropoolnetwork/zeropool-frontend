import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DemoState = {
  tokenAmount: number | undefined
  privateAmount: number | undefined
  minting: boolean
  walletAddress: string | undefined
  backdrop: boolean
}

export const initialDemoState: DemoState = {
  tokenAmount: undefined,
  privateAmount: undefined,
  minting: false,
  walletAddress: undefined,
  backdrop: false,
}

// tslint:disable: no-empty
export const demoSlice = createSlice({
  name: 'demo',
  initialState: initialDemoState,
  reducers: {
    initApi: (state, action: PayloadAction<null>) => {
      state.backdrop = true
    },
    initApiSuccess: (state, action: PayloadAction<null>) => {
      state.backdrop = false
    },
    initApiFailure: (state, action: PayloadAction<string>) => {
      state.backdrop = false
    },

    updateBalances: (state, action: PayloadAction<null>) => {},
    updateBalancesFailure: (state, action: PayloadAction<string>) => {},

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
    },
    mintFalure: (state, action: PayloadAction<string>) => {
      state.minting = false
    },

    resetAccount: (state, action: PayloadAction<null>) => {},

    getWalletAddress: (state, action: PayloadAction<null>) => {},
    getWalletAddressSuccess: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload
    },
    getWalletAddressFailure: (state, action: PayloadAction<string>) => {
      state.walletAddress = 'Cant get wallet address'
    },
  },
})

export const demoActions = demoSlice.actions
export const demoReducer = demoSlice.reducer
