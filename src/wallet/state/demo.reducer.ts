import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TransferData } from 'shared/models'
import { Transaction, TransactionStatus } from 'shared/models/transaction'

export type DemoState = {
  backdrop: boolean
  deposit: boolean
  initials: { seed: string, password: string } | null | undefined
  publicBalance: string | undefined
  privateBalance: string | undefined
  tokenBalance: string | undefined
  minting: boolean
  privateAddress: string | undefined
  readiness: boolean
  recovery: boolean
  transfer: boolean
  transferModal: boolean
  transactionStatus: TransactionStatus | undefined
  walletAddress: string | undefined
  withdraw: boolean
}

export const initialDemoState: DemoState = {
  backdrop: false,
  deposit: false,
  initials: undefined,
  publicBalance: undefined,
  privateBalance: undefined,
  tokenBalance: undefined,
  minting: false,
  privateAddress: undefined,
  readiness: false,
  recovery: false,
  transfer: false,
  transferModal: false,
  transactionStatus: undefined,
  walletAddress: undefined,
  withdraw: false,
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
      state.publicBalance = undefined
      state.privateBalance = undefined
      state.tokenBalance = undefined
      state.walletAddress = undefined
      state.privateAddress = undefined
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

    updateBalances: (state, action: PayloadAction<null | { funds: number, tokens: number, private: number }>) => {
      state.privateBalance = undefined
      state.publicBalance = undefined
      state.tokenBalance = undefined
    },
    updateBalancesFailure: (state, action: PayloadAction<string>) => { },

    publicBalance: (state, action: PayloadAction<string>) => {
      state.publicBalance = action.payload
    },
    privateBalance: (state, action: PayloadAction<string>) => {
      state.privateBalance = action.payload
    },
    tokenBalance: (state, action: PayloadAction<string>) => {
      state.tokenBalance = action.payload
    },

    transaction: (state, action: PayloadAction<Transaction>) => {
      state.transactionStatus = action.payload.status
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

    deposit: (state, action: PayloadAction<string>) => {
      state.deposit = true
    },
    depositSuccess: (state, action: PayloadAction<string>) => {
      state.deposit = false
    },
    depositFailure: (state, action: PayloadAction<string>) => {
      state.deposit = false
    },

    withdraw: (state, action: PayloadAction<string>) => {
      state.withdraw = true
    },
    withdrawSuccess: (state, action: PayloadAction<string>) => {
      state.withdraw = false
    },
    withdrawFailure: (state, action: PayloadAction<string>) => {
      state.withdraw = false
    },

    transfer: (state, action: PayloadAction<TransferData>) => {
      state.transfer = true
    },
    transferSuccess: (state, action: PayloadAction<string>) => {
      state.transfer = false
    },
    transferFailure: (state, action: PayloadAction<string>) => {
      state.transfer = false
    },

    resetAccount: (state, action: PayloadAction<null>) => initialDemoState,
    recoverWallet: (state, action: PayloadAction<string | null>) => {
      state.backdrop = false
      state.recovery = true
      state.readiness = true
    },
    recoverWalletSuccess: (state, action: PayloadAction<{ seed: string, password: string }>) => {
      state.recovery = false
    },
    recoverWalletFailure: (state, action: PayloadAction<string>) => { },

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

    exportSeed: (state, action: PayloadAction<string>) => { },
    exportSeedSuccess: (state, action: PayloadAction<string>) => { },
    exportSeedFailure: (state, action: PayloadAction<string>) => { },

    transferModal: (state, action: PayloadAction<boolean>) => {
      state.transferModal = action.payload
    }
  },
})

export const demoActions = demoSlice.actions
export const demoReducer = demoSlice.reducer
