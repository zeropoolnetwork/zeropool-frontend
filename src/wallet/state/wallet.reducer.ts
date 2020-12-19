import { ActionType, createReducer } from 'typesafe-actions';

import { Token } from 'shared/models/token';
import { recordFromArray } from 'shared/util/from';
import supportedTokens from 'assets/settings/supported-tokens.json'

import { walletActions as actions } from 'wallet/state/wallet.actions';
import { WalletView } from 'wallet/state/models/wallet-view';

export const initialWalletName = 'Main wallet';

export interface WalletState {
  currentView: WalletView;
  walletAmounts: Record<Token['symbol'], number>;
  walletName: string;
  isPrivate: boolean;
  supportedTokens: Token[];
  supportedTokensRecord: Record<Token['symbol'], Token>;
  displayedTokens: Record<string, Token['symbol'][]>;
  usdRates: Record<Token['symbol'], number>;
}

export const initialWalletState: WalletState = {
  currentView: WalletView.Balance,
  walletAmounts: { 'ETH': 2.3425, 'NEAR': 15 },
  walletName: initialWalletName,
  isPrivate: false,
  supportedTokens: supportedTokens,
  supportedTokensRecord: recordFromArray(supportedTokens, 'symbol'),
  displayedTokens: { [initialWalletName]: ['ETH', 'WAVES', 'NEAR'] },
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
