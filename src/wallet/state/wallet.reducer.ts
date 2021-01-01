import { ActionType, createReducer } from 'typesafe-actions';

import supportedTokens from 'assets/settings/supported-tokens.json'

import { Token } from 'shared/models/token';
import { recordFromArray } from 'shared/util/from';

import { walletActions as actions } from 'wallet/state/wallet.actions';
import { WalletView } from 'wallet/state/models/wallet-view';

export const initialWalletName = 'Main wallet';

export interface WalletState {
  currentView: WalletView;
  amounts: Record<Token['symbol'], number>;
  isPrivate?: boolean;
  supportedTokens: Token[];
  supportedTokensRecord: Record<Token['symbol'], Token>;
  usdRates: Record<Token['symbol'], number>;
}

export const initialWalletState: WalletState = {
  currentView: WalletView.Balance,
  amounts: { 'ETH': 2.3425, 'NEAR': 15 },
  isPrivate: false,
  supportedTokens: supportedTokens,
  supportedTokensRecord: recordFromArray(supportedTokens, 'symbol'),
  usdRates: {},
};

export const walletReducer = createReducer<
  WalletState,
  ActionType<typeof actions>
>(initialWalletState)
  .handleAction(actions.openWallet, (state, { payload }) => ({
    ...state,
    isPrivate: payload || false,
  }))
  .handleAction(actions.menu, (state, { payload }) => ({
    ...state,
    currentView: payload,
  }))
  .handleAction(actions.getRatesSuccess, (state, { payload }) => ({
    ...state,
    usdRates: payload,
  }));
