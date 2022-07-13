import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TransferData } from 'shared/models'

export type DemoState = {
  initials: { seed: string, password: string } | null | undefined
  publicBalance: number | undefined
  privateBalance: number | undefined
  tokenBalance: number | undefined
  minting: boolean
  walletAddress: string | undefined
  privateAddress: string | undefined
  backdrop: boolean
  deposit: boolean
  withdraw: boolean
  transfer: boolean
  transferModal: boolean
  readiness: boolean
  recovery: boolean
}

export const initialDemoState: DemoState = {
  initials: undefined,
  publicBalance: undefined,
  privateBalance: undefined,
  tokenBalance: undefined,
  minting: false,
  walletAddress: undefined,
  privateAddress: undefined,
  backdrop: false,
  deposit: false,
  withdraw: false,
  transfer: false,
  transferModal: false,
  readiness: false,
  recovery: false,
}

// tslint:disable: no-empty
export const demoSlice = createSlice({
  name: 'demo',
  initialState: initialDemoState,
  reducers: {
    setSeedAndPasword: (state, action: PayloadAction<{ seed: string; password: string }>) => {
      state.initials = { seed: action.payload.seed, password: action.payload.password }
    },
    initApi: (state, action: PayloadAction<null>) => {
      state.backdrop = true
      state.readiness = false
      state.recovery = false
      state.transferModal = false
      state.minting = false
      state.deposit = false
      state.withdraw = false
      state.transfer = false
    },
    initApiSuccess: (state, action: PayloadAction<null>) => {
      state.backdrop = false
      state.initials = null
      state.readiness = true
    },
    initApiFailure: (state, action: PayloadAction<string>) => {
      state.backdrop = false
      state.initials = null
    },

    updateBalances: (state, action: PayloadAction<null|{funds: number, tokens: number, private: number}>) => {
      state.privateBalance = undefined
      state.publicBalance = undefined
      state.tokenBalance = undefined
    },
    updateBalancesFailure: (state, action: PayloadAction<string>) => { },

    publicBalance: (state, action: PayloadAction<number>) => {
      state.publicBalance = action.payload
    },
    privateBalance: (state, action: PayloadAction<number>) => {
      state.privateBalance = action.payload
    },
    tokenBalance: (state, action: PayloadAction<number>) => {
      state.tokenBalance = action.payload
    },

    mint: (state, action: PayloadAction<string>) => {
      state.minting = true
    },
    mintSuccess: (state, action: PayloadAction<number>) => {
      state.minting = false
    },
    mintFalure: (state, action: PayloadAction<string>) => {
      state.minting = false
    },

    deposit: (state, action) => {
      state.deposit = true
    },
    depositSuccess: (state, action: PayloadAction<number>) => {
      state.deposit = false
    },
    depositFalure: (state, action: PayloadAction<string>) => {
      state.deposit = false
    },

    withdraw: (state, action) => {
      state.withdraw = true
    },
    withdrawSuccess: (state, action: PayloadAction<number>) => {
      state.withdraw = false
    },
    withdrawFalure: (state, action: PayloadAction<string>) => {
      state.withdraw = false
    },

    transfer: (state, action: PayloadAction<TransferData>) => {
      state.transfer = true
    },
    transferSuccess: (state, action: PayloadAction<string>) => {
      state.transfer = false
    },
    transferFalure: (state, action: PayloadAction<string>) => {
      state.transfer = false
    },

    resetAccount: (state, action: PayloadAction<null>) => initialDemoState,
    recoverWallet: (state, action: PayloadAction<string|null>) => {
      state.backdrop = false
      state.recovery = true
      state.readiness = true
    },
    recoverWalletSuccess: (state, action: PayloadAction<{seed: string, password: string}>) => {
      state.recovery = false
    },
    recoverWalletFailure: (state, action: PayloadAction<string>) => {},

    getWalletAddress: (state, action: PayloadAction<null>) => { },
    getWalletAddressSuccess: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload
    },
    getWalletAddressFailure: (state, action: PayloadAction<string>) => {
      state.walletAddress = 'Cant get wallet address'
    },

    getPrivateAddress: (state, action: PayloadAction<null>) => { },
    getPrivateAddressSuccess: (state, action: PayloadAction<string>) => {
      state.privateAddress = action.payload
    },
    getPrivateAddressFailure: (state, action: PayloadAction<string>) => {
      state.privateAddress = 'Cant get private address'
    },

    exportSeed: (state, action: PayloadAction<string>) => {},
    exportSeedSuccess: (state, action: PayloadAction<string>) => {},
    exportSeedFailure: (state, action: PayloadAction<string>) => {},

    transferModal: (state, action: PayloadAction<boolean>) => {
      state.transferModal = action.payload
    }
  },
})

export const demoActions = demoSlice.actions
export const demoReducer = demoSlice.reducer
