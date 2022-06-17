import supportedTokens from 'assets/settings/supported-tokens.json'

import { recordFromArray } from 'shared/utils/from'
import { Token, TokenSymbol } from 'shared/models/token'

import { PollSettings, SendData, Wallet } from 'wallet/state/models'
import { walletActions as actions } from 'wallet/state/wallet.actions'
import { navigationHelper } from 'wallet/state/helpers/navigation.helper'
import { amountsHelper } from 'wallet/state/helpers/amounts.helper'
import { walletsHelper } from 'wallet/state/helpers/wallets.helper'
import { Transaction } from 'wallet/state/models/transaction'
import { WalletView } from 'wallet/state/models/wallet-view'
import { createReducer } from '@reduxjs/toolkit'
import { demoActions } from 'wallet/state/demo.reducer'

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

export const walletReducer = createReducer(initialWalletState, (builder) =>
  builder
    .addCase(actions.menu, (state, { payload }) => ({
      ...state,
      activeView: payload !== WalletView.Reset ? payload : state.activeView,
      processing: initialWalletState.processing,
    }))
    .addCase(actions.headerBack, (state) => ({
      ...navigationHelper.handleBackClick(state),
      processing: initialWalletState.processing,
    }))
    .addCase(actions.openBalanceView, (state) => ({
      ...navigationHelper.getBalanceView(state),
    }))
    .addCase(actions.openWalletsView, (state, { payload }) => ({
      ...state,
      activeView: WalletView.Wallets,
      activeToken: payload,
      previousView: state.activeView,
    }))
    .addCase(actions.openTransactionsView, (state, { payload }) => ({
      ...state,
      activeView: WalletView.Transactions,
      activeWallet: payload,
      previousView: state.activeView,
      transactions: null,
      amounts: amountsHelper.getAmountsForWallet(payload),
    }))
    .addCase(actions.openReceiveView, (state, { payload }) => ({
      ...navigationHelper.getReceiveView(state, payload),
      privateAddress: null,
    }))
    .addCase(actions.openSendInitialView, (state, { payload }) => ({
      ...navigationHelper.getSendInitialView(state, payload),
    }))
    .addCase(actions.openSendConfirmView, (state, { payload }) => ({
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
    .addCase(actions.getTransactionsSuccess, (state, { payload }) => ({
      ...state,
      transactions: payload,
    }))
    .addCase(actions.setSeed, (state, { payload }) => ({
      ...state,
      seed: payload,
    }))
    .addCase(actions.updateWalletsSuccess, (state, { payload }) => ({
      ...state,
      wallets: payload,
      processing: initialWalletState.processing,
      activeWallet:
        state.activeWallet && state.activeToken
          ? payload[state.activeToken.symbol][
              walletsHelper.getActiveIndex(
                payload[state.activeToken.symbol],
                state.activeWallet,
              )
            ]
          : null,
    }))
    .addCase(actions.refreshAmounts, (state) => ({
      ...state,
      amounts: amountsHelper.getAmounts(state),
    }))
    .addCase(actions.resetAccount, () => initialWalletState)
    .addCase(demoActions.resetAccount, () => initialWalletState)
    .addCase(actions.edit, (state, { payload }) => ({
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
    .addCase(actions.addWalletSuccess, (state, { payload }) => ({
      ...state,
      wallets: payload,
    }))
    .addCase(actions.hideWallet, (state, { payload }) => ({
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
    .addCase(actions.getRatesSuccess, (state, { payload }) => ({
      ...state,
      usdRates: payload,
    }))
    .addCase(actions.getPrivateAddressSuccess, (state, { payload }) => ({
      ...state,
      privateAddress: payload,
    }))
    .addCase(actions.send, (state) => ({
      ...state,
      processing: {
        ...state.processing,
        send: true,
      },
    }))
    .addCase(actions.apiError, (state) => ({
      ...state,
      processing: initialWalletState.processing,
    })),
)
