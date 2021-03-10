import { createSelector } from 'reselect';

import { RootState } from 'state';

import { WalletState } from 'wallet/state/wallet.reducer';
import { walletsHelper } from 'wallet/state/helpers/wallets.helper';

export const getWalletState = (state: RootState): WalletState => state.account;

export const getActiveView = createSelector(
  getWalletState,
  state => state.activeView,
);

export const getActiveToken = createSelector(
  getWalletState,
  state => state.activeToken,
);

export const getWallets = createSelector(
  getWalletState,
  state => state.wallets,
  );
  
export const getActiveWallet = createSelector(
  getWalletState,
  state => state.activeWallet,
);

export const getActiveWalletIndex = createSelector(
  getWallets,
  getActiveWallet,
  getActiveToken,
  (wallets, wallet, token) => 
    wallets && token && wallet ? 
      walletsHelper.getActiveIndex(
        wallets[token?.symbol], 
        wallet,
      ) : null,
);


export const getAmounts = createSelector(
  getWalletState,
  state => state.amounts,
);

export const getWalletsForActiveToken = createSelector(
  getWalletState,
  state => state.activeToken && state.wallets ? state.wallets[state.activeToken.symbol] : null,
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

export const getSendData = createSelector(
  getWalletState,
  state => state.send,
);

export const getSeed = createSelector(
  getWalletState,
  state => state.seed,
);

export const getPollSettings = createSelector(
  getWalletState,
  state => state.pollSettings,
);
