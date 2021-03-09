import { ActionType, createReducer } from 'typesafe-actions';

import supportedTokens from 'assets/settings/supported-tokens.json'

import { recordFromArray } from 'shared/util/from';
import { Token, TokenSymbol } from 'shared/models/token';

import { walletActions as actions } from 'wallet/state/wallet.actions';
import { navigationHelper } from 'wallet/state/helpers/navigation.helper';
import { walletsHelper } from 'wallet/state/helpers/wallets.helper';
import { PollSettings } from 'wallet/state/models/poll-settings';
import { WalletView } from 'wallet/state/models/wallet-view';
import { Wallet } from 'wallet/state/models/wallet';

export const initialWalletName = 'Main wallet';

const pollSettingsDefault: PollSettings = { account: 0, amount: 5, offset: 0 };

export interface WalletState {
  activeView: WalletView;
  activeToken: Token | null;
  activeWallet: Wallet | null;
  amounts: Record<TokenSymbol, number> | null;
  pollSettings: PollSettings;
  seed: string | null;
  send?: { wallet: Wallet, address: string, amount: number };
  supportedTokens: Token[];
  supportedTokensRecord: Record<TokenSymbol, Token>;
  usdRates: Record<TokenSymbol, number>;
  wallets: Record<TokenSymbol, Wallet[]> | null;
}

export const initialWalletState: WalletState = {
  activeView: WalletView.Balance,
  activeToken: null,
  activeWallet: null,
  amounts: null,
  pollSettings: pollSettingsDefault,
  seed: null,
  supportedTokens: supportedTokens,
  supportedTokensRecord: recordFromArray(supportedTokens, 'symbol'),
  usdRates: {},
  wallets: null,
};

export const walletReducer = createReducer<
  WalletState,
  ActionType<typeof actions>
>(initialWalletState)
  .handleAction(actions.menu, (state, { payload }) => ({
    ...state,
    activeView: payload !== WalletView.Reset ? payload : state.activeView,
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
  .handleAction(actions.setSeed, (state, { payload }) => ({
    ...state,
    seed: payload.seed,
  }))
  .handleAction(actions.updateWalletsSuccess, (state, { payload }) => ({
    ...state,
    wallets: payload.wallets,
  }))
  .handleAction(actions.resetAccount, () =>
    initialWalletState
  )
  .handleAction(actions.edit, (state , { payload }) => ({
    ...state,
    wallets: !(state.activeToken && state.wallets) ? state.wallets : {
      ...state.wallets,
      [state.activeToken.symbol]: walletsHelper.renameWallet(
        state.wallets[state.activeToken.symbol], 
        payload.wallet,
        payload.name,
      ),
    }
  }))
  .handleAction(actions.addWalletSuccess, (state , { payload }) => ({
    ...state,
    wallets: payload.wallets,
  }))
  .handleAction(actions.hideWallet, (state , { payload }) => ({
    ...state,
    wallets: !(state.activeToken && state.wallets) ? state.wallets : {
      ...state.wallets,
      [state.activeToken.symbol]: walletsHelper.hideWallet(
        state.wallets[state.activeToken.symbol],
        payload.wallet,
      ),
    }
  }))
  .handleAction(actions.getRatesSuccess, (state, { payload }) => ({
    ...state,
    usdRates: payload,
  }));
 