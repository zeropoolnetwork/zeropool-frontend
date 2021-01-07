import { createSelector } from "reselect";

import { RootState } from "state";

import { WalletState } from "wallet/state/wallet.reducer";

export const getWalletState = (state: RootState): WalletState => state.wallet;

export const getActiveView = createSelector(
  getWalletState,
  state => state.activeView,
);

export const getActiveToken = createSelector(
  getWalletState,
  state => state.activeToken,
);

export const getAmounts = createSelector(
  getWalletState,
  state => state.amounts,
);

export const getWallets = createSelector(
  getWalletState,
  state => state.wallets,
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