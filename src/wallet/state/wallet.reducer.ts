import { ActionType, createReducer } from 'typesafe-actions'

import supportedTokens from 'assets/settings/supported-tokens.json'

import { recordFromArray } from 'shared/util/from'
import { Token, TokenSymbol } from 'shared/models/token'

import { PollSettings, SendData, Wallet } from 'wallet/state/models'
import { walletActions as actions } from 'wallet/state/wallet.actions'
import { navigationHelper } from 'wallet/state/helpers/navigation.helper'
import { amountsHelper } from 'wallet/state/helpers/amounts.helper'
import { walletsHelper } from 'wallet/state/helpers/wallets.helper'
import { Transaction } from 'wallet/state/models/transaction'
import { WalletView } from 'wallet/state/models/wallet-view'

export const initialWalletName = 'Main wallet'

const pollSettingsDefault: PollSettings = { account: 0, amount: 5, offset: 0 }

export type WalletState = {
  activeView: WalletView
  activeToken: Token | null
  activeWallet: Wallet | null
  amounts: Record<TokenSymbol, number> | null
  pollSettings: PollSettings
  seed: string | null
  send: SendData | null
  supportedTokens: Token[]
  supportedTokensRecord: Record<TokenSymbol, Token>
  transactions: Transaction[] | null
  usdRates: Record<TokenSymbol, number>
  wallets: Record<TokenSymbol, Wallet[]> | null
  previousView: WalletView | null
  privateAddress: string | null
  processing: {
    send: boolean
  }
}

export const initialWalletState: WalletState = {
  activeView: WalletView.Balance,
  activeToken: null,
  activeWallet: null,
  amounts: null,
  pollSettings: pollSettingsDefault,
  seed: null,
  send: null,
  supportedTokens: supportedTokens.supported,
  supportedTokensRecord: recordFromArray(supportedTokens.supported, 'symbol'),
  transactions: null,
  usdRates: {},
  wallets: null,
  previousView: null,
  privateAddress: null,
  processing: {
    send: false,
  },
}

export const walletReducer = createReducer<WalletState, ActionType<typeof actions>>(
  initialWalletState,
)
  .handleAction(actions.menu, (state, { payload }) => ({
    ...state,
    activeView: payload !== WalletView.Reset ? payload : state.activeView,
    processing: initialWalletState.processing,
  }))
  .handleAction(actions.headerBack, (state) => ({
    ...navigationHelper.handleBackClick(state),
    processing: initialWalletState.processing,
  }))
  .handleAction(actions.openBalanceView, (state) => ({
    ...navigationHelper.getBalanceView(state),
  }))
  .handleAction(actions.openWalletsView, (state, { payload }) => ({
    ...state,
    activeView: WalletView.Wallets,
    activeToken: payload,
    previousView: state.activeView,
  }))
  .handleAction(actions.openTransactionsView, (state, { payload }) => ({
    ...state,
    activeView: WalletView.Transactions,
    activeWallet: payload,
    previousView: state.activeView,
    transactions: null,
    amounts: amountsHelper.getAmountsForWallet(payload),
  }))
  .handleAction(actions.openReceiveView, (state, { payload }) => ({
    ...navigationHelper.getReceiveView(state, payload),
    privateAddress: null,
  }))
  .handleAction(actions.openSendInitialView, (state, { payload }) => ({
    ...navigationHelper.getSendInitialView(state, payload),
  }))
  .handleAction(actions.openSendConfirmView, (state, { payload }) => ({
    ...state,
    activeView: WalletView.SendConfirmation,
    activeWallet: payload.wallet,
    previousView: state.activeView,
    send: {
      wallet: payload.wallet,
      address: payload.address,
      amount: payload.amount,
      fee: payload.fee,
    },
  }))
  .handleAction(actions.getTransactionsSuccess, (state, { payload }) => ({
    ...state,
    transactions: payload,
  }))
  .handleAction(actions.setSeed, (state, { payload }) => ({
    ...state,
    seed: payload,
  }))
  .handleAction(actions.updateWalletsSuccess, (state, { payload }) => ({
    ...state,
    wallets: payload,
    processing: initialWalletState.processing,
    activeWallet:
      state.activeWallet && state.activeToken
        ? payload[state.activeToken.symbol][
            walletsHelper.getActiveIndex(payload[state.activeToken.symbol], state.activeWallet)
          ]
        : null,
  }))
  .handleAction(actions.refreshAmounts, (state) => ({
    ...state,
    amounts: amountsHelper.getAmounts(state),
  }))
  .handleAction(actions.resetAccount, () => initialWalletState)
  .handleAction(actions.edit, (state, { payload }) => ({
    ...state,
    wallets:
      !state.activeToken || !state.wallets
        ? state.wallets
        : {
            ...state.wallets,
            [state.activeToken.symbol]: walletsHelper.renameWallet(
              state.wallets[state.activeToken.symbol],
              payload.wallet,
              payload.name,
            ),
          },
  }))
  .handleAction(actions.addWalletSuccess, (state, { payload }) => ({
    ...state,
    wallets: payload,
  }))
  .handleAction(actions.hideWallet, (state, { payload }) => ({
    ...state,
    wallets:
      !state.activeToken || !state.wallets
        ? state.wallets
        : {
            ...state.wallets,
            [state.activeToken.symbol]: walletsHelper.hideWallet(
              state.wallets[state.activeToken.symbol],
              payload,
            ),
          },
  }))
  .handleAction(actions.getRatesSuccess, (state, { payload }) => ({
    ...state,
    usdRates: payload,
  }))
  .handleAction(actions.getPrivateAddressSuccess, (state, { payload }) => ({
    ...state,
    privateAddress: payload,
  }))
  .handleAction(actions.send, (state) => ({
    ...state,
    processing: {
      ...state.processing,
      send: true,
    },
  }))
  .handleAction(actions.apiError, (state) => ({
    ...state,
    processing: initialWalletState.processing,
  }))
