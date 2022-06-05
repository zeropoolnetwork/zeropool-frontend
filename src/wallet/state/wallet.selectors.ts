import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'state'

import { WalletState } from 'wallet/state/wallet.reducer'
import { walletsHelper } from 'wallet/state/helpers/wallets.helper'

export const getWalletState = (state: RootState) => state.wallet

export const getActiveView = createSelector(getWalletState, (state) => state.activeView)

export const getActiveToken = createSelector(getWalletState, (state) => state.activeToken)

export const getWallets = createSelector(getWalletState, (state) => state.wallets)

export const getActiveWallet = createSelector(getWalletState, (state) => state.activeWallet)

export const getActiveWalletIndex = createSelector(
  getWallets,
  getActiveWallet,
  getActiveToken,
  (wallets, wallet, token) =>
    wallets && token && wallet
      ? walletsHelper.getActiveIndex(wallets[token?.symbol], wallet)
      : null,
)

export const getAmounts = createSelector(getWalletState, (state) => state.amounts)

export const getWalletsForActiveToken = createSelector(getWalletState, (state) =>
  state.activeToken && state.wallets ? state.wallets[state.activeToken.symbol] : null,
)

export const getSupportedTokens = createSelector(getWalletState, (state) => state.supportedTokens)

export const getSupportedTokensRecord = createSelector(
  getWalletState,
  (state) => state.supportedTokensRecord,
)

export const getUsdRates = createSelector(getWalletState, (state) => state.usdRates)

export const getSendData = createSelector(getWalletState, (state) => state.send)

export const selectSeed = createSelector(getWalletState, (state) => state.seed)

export const getPollSettings = createSelector(getWalletState, (state) => state.pollSettings)

export const getTransactions = createSelector(getWalletState, (state) => state.transactions)

export const getPrivateAddress = createSelector(getWalletState, (state) => state.privateAddress)

export const getProcessing = createSelector(getWalletState, (state) => state.processing)
