import { createSelector } from "reselect";

import { RootState } from "state";

import { WalletState } from "wallet/state/wallet.reducer";

export const getWalletState = (state: RootState): WalletState => state.wallet;

export const getCurrentView = createSelector(
  getWalletState,
  state => state.currentView,
);

export const getWalletName = createSelector(
  getWalletState,
  state => state.walletName,
);

export const getWalleAmounts = createSelector(
  getWalletState,
  state => state.walletAmounts,
);

export const getSupportedTokens = createSelector(
  getWalletState,
  state => state.supportedTokens,
);

export const getDisplayedTokens = createSelector(
  getWalletState,
  state => state.displayedTokens,
);

export const getSupportedTokensRecord = createSelector(
  getWalletState,
  state => state.supportedTokensRecord,
);

export const getUsdRates = createSelector(
  getWalletState,
  state => state.usdRates,
);