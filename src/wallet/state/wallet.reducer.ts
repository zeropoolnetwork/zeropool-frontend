import { ActionType, createReducer } from 'typesafe-actions';
// import { CoinType } from 'zeropool-api-js';

import supportedTokens from 'assets/settings/supported-tokens.json'

import { Token } from 'shared/models/token';
import { recordFromArray } from 'shared/util/from';
import { _testWalletsEth, _testWalletsNear } from 'shared/helpers/test/app-state.helper';

import { walletActions as actions } from 'wallet/state/wallet.actions';
import { navigationHelper } from 'wallet/state/helpers/navigation.helper';
import { WalletView } from 'wallet/state/models/wallet-view';
import { Wallet } from 'wallet/state/models/wallet';

export const initialWalletName = 'Main wallet';

// const _testAmounts = { 'ETH': 2.3425, 'NEAR': 15 };

export interface WalletState {
  activeView: WalletView;
  activeToken: Token | null;
  activeWallet: Wallet | null;
  amounts: Record<Token['symbol'], number>;
  send?: { wallet: Wallet, address: string, amount: number };
  supportedTokens: Token[];
  supportedTokensRecord: Record<Token['symbol'], Token>;
  usdRates: Record<Token['symbol'], number>;
  wallets: Record<Token['symbol'], Wallet[]>;
  seed: string | null;
}

export const initialWalletState: WalletState = {
  activeView: WalletView.Balance,
  activeToken: null,
  activeWallet: null,
  amounts: {},
  supportedTokens: supportedTokens,
  supportedTokensRecord: recordFromArray(supportedTokens, 'symbol'),
  usdRates: {},
  wallets: {
    ETH: _testWalletsEth,
    NEAR: _testWalletsNear,
    WAVES: [],
  },
  seed: null,
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
    ...navigationHelper.handleBackClick(state),
  }))
  .handleAction(actions.openBalanceView, state => ({
    ...navigationHelper.getBalanceView(state),
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
  .handleAction(actions.openReceiveView, (state, { payload }) => ({
    ...navigationHelper.getReceiveView(state, payload),
  }))
  .handleAction(actions.openSendInitialView, (state, { payload }) => ({
    ...navigationHelper.getSendInitialView(state, payload),
  }))
  .handleAction(actions.openSendConfirmView, (state, { payload }) => ({
    ...state,
    activeView: WalletView.SendConfirmation,
    activeWallet: payload.wallet,
    send: {
      wallet: payload.wallet,
      address: payload.address,
      amount: payload.amount,
    }
  }))
  .handleAction(actions.setSeedSuccess, (state, { payload }) => ({
    ...state,
    seed: payload.seed,
  }))
  .handleAction(actions.getRatesSuccess, (state, { payload }) => ({
    ...state,
    usdRates: payload,
  }));
