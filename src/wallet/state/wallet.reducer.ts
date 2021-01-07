import { ActionType, createReducer } from 'typesafe-actions';

import supportedTokens from 'assets/settings/supported-tokens.json'

import { Token } from 'shared/models/token';
import { Address } from 'shared/models/address';
import { recordFromArray } from 'shared/util/from';

import { walletActions as actions } from 'wallet/state/wallet.actions';
import { navigationHelper } from 'wallet/state/helpers/navigation.helper';
import { WalletView } from 'wallet/state/models/wallet-view';

export const initialWalletName = 'Main wallet';

const _testWallets = [
  { name: 'Wallet1', amount: 0, address: {symbol: 'ETH', value: 'x123333', private: false}},
  { name: 'Wallet2', amount: 1.3425, address: {symbol: 'ETH', value: 'x123222', private: false}},
  { name: 'Wallet3', amount: 1, address: {symbol: 'ETH', value: 'x123111', private: true}},
]

const _testAmounts = { 'ETH': 2.3425, 'NEAR': 15 };

export interface WalletState {
  activeView: WalletView;
  activeToken: Token | null;
  amounts: Record<Token['symbol'], number>;
  isPrivate?: boolean;
  supportedTokens: Token[];
  supportedTokensRecord: Record<Token['symbol'], Token>;
  usdRates: Record<Token['symbol'], number>;
  wallets: {address: Address, amount: number, name: string}[];
}

export const initialWalletState: WalletState = {
  activeView: WalletView.Balance,
  activeToken: null,
  amounts: _testAmounts,
  isPrivate: false,
  supportedTokens: supportedTokens,
  supportedTokensRecord: recordFromArray(supportedTokens, 'symbol'),
  usdRates: {},
  wallets: _testWallets,
};

export const walletReducer = createReducer<
  WalletState,
  ActionType<typeof actions>
>(initialWalletState)
  .handleAction(actions.menu, (state, { payload }) => ({
    ...state,
    activeView: payload,
  }))
  .handleAction(actions.headerBack, state => ({
    ...state,
    activeView: navigationHelper.handleBackClick(state.activeView),
  }))
  .handleAction(actions.openBalanceView, state => ({
    ...state,
    activeToken: null,
    activeView: WalletView.Balance,
  }))
  .handleAction(actions.openWalletsView, (state, { payload }) => ({
    ...state,
    activeView: WalletView.Wallets,
    activeToken: payload,
  }))
  .handleAction(actions.openAddressView, (state, { payload }) => ({
    ...state,
    activeView: WalletView.Address,
    activeAddress: payload,
  }))
  .handleAction(actions.getRatesSuccess, (state, { payload }) => ({
    ...state,
    usdRates: payload,
  }));
