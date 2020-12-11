import { createSelector } from "reselect";

import { RootState } from "state";

export const getWalletState = (state: RootState) => state.wallet;

export const getWalletName = createSelector(
  getWalletState,
  state => state.walletName,
);

export const getSupportedTokens = createSelector(
  getWalletState,
  state => state.supportedTokens,
);

export const getSupportedTokensRecord = createSelector(
  getWalletState,
  state => state.supportedTokensRecord,
);

export const getUsdRates = createSelector(
  getWalletState,
  state => state.usdRates,
);