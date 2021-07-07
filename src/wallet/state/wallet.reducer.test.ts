import { _testToken, _testWalletsEth, _testWalletsNear } from 'shared/helpers/test/app-state.helper'
import { deepFreeze } from 'shared/util/deep-freeze'
import { WalletView } from 'wallet/state/models'

import { walletActions as actions } from 'wallet/state/wallet.actions'

import { initialWalletState, walletReducer, WalletState } from './wallet.reducer'

describe('wallet reducer', () => {
  const initialState: WalletState = deepFreeze(initialWalletState)

  it('handles `openBalance` action', () => {
    const state = walletReducer(initialState, actions.openBalanceView())

    expect(state.activeToken).toBe(null)
  })

  it('handles `getRates` action', () => {
    const payload = { Ethereum: 600, Near: 1.2 }

    const state = walletReducer(initialState, actions.getRatesSuccess(payload))

    expect(state.usdRates.Near).toBe(1.2)
  })

  describe('Handles `openBalanceView` action', () => {
    it('sets active view to Balance view', () => {
      const state = walletReducer(
        {
          ...initialState,
          activeView: WalletView.About,
        },
        actions.openBalanceView(),
      )

      expect(state.activeView).toBe(WalletView.Balance)
    })

    it('sets active token and active wallet to Null', () => {
      const state = walletReducer(
        {
          ...initialState,
          activeWallet: _testWalletsEth[0],
          activeToken: _testToken,
        },
        actions.openBalanceView(),
      )

      expect(state.activeToken).toBe(null)
      expect(state.activeWallet).toBe(null)
    })
  })

  describe('Handles `openWalletsView` action', () => {
    const payload = _testToken

    it('sets active view to Wallets view', () => {
      const state = walletReducer(
        {
          ...initialState,
          activeView: WalletView.About,
        },
        actions.openWalletsView(payload),
      )

      expect(state.activeView).toBe(WalletView.Wallets)
    })

    it('moves active view to previous', () => {
      const state = walletReducer(
        {
          ...initialState,
          activeView: WalletView.Send,
        },
        actions.openWalletsView(payload),
      )

      expect(state.previousView).toBe(WalletView.Send)
    })

    it('sets active token to payload value', () => {
      const state = walletReducer(initialState, actions.openWalletsView(payload))

      expect(state.activeToken?.id).toBe(_testToken.id)
    })
  })

  describe('Handles `openTransactionsView` action', () => {
    const payload = _testWalletsEth[0]

    it('sets active view to Transactions view', () => {
      const state = walletReducer(
        {
          ...initialState,
          activeView: WalletView.About,
        },
        actions.openTransactionsView(payload),
      )

      expect(state.activeView).toBe(WalletView.Transactions)
    })

    it('moves active view to previous', () => {
      const state = walletReducer(
        {
          ...initialState,
          activeView: WalletView.Send,
        },
        actions.openTransactionsView(payload),
      )

      expect(state.previousView).toBe(WalletView.Send)
    })

    it('sets active wallet to payload value', () => {
      const state = walletReducer(initialState, actions.openTransactionsView(payload))

      expect(state.activeWallet?.name).toBe(payload.name)
    })

    it('resets transactions', () => {
      const state = walletReducer(
        {
          ...initialState,
          transactions: [{ 1: 1 }, { 2: 2 }] as any[],
        },
        actions.openTransactionsView(payload),
      )

      expect(state.transactions).toBe(null)
    })
  })

  describe('Handles `openReceiveView` action', () => {
    const payload = _testWalletsEth[0]
    
    const requiredPart: Partial<WalletState> = {
      activeToken: _testToken,
      wallets: { ETH: _testWalletsEth },
    }

    it('sets active view to Receive view', () => {
      const state = walletReducer(
        {
          ...initialState,
          ...requiredPart,
          activeView: WalletView.About,
        },
        actions.openReceiveView(payload),
      )

      expect(state.activeView).toBe(WalletView.Receive)
    })

    it('moves active view to previous', () => {
      const state = walletReducer(
        {
          ...initialState,
          ...requiredPart,
          activeView: WalletView.Send,
        },
        actions.openReceiveView(payload),
      )

      expect(state.previousView).toBe(WalletView.Send)
    })

    it('sets active wallet to payload value', () => {
      const state = walletReducer(
        {
          ...initialState,
          ...requiredPart,
        },
        actions.openReceiveView(payload),
      )

      expect(state.activeWallet?.name).toBe(payload.name)
    })
  })

  describe('Handles `openSendInitialView` action', () => {
    const payload = _testWalletsEth[0]

    const requiredPart: Partial<WalletState> = {
      activeToken: _testToken,
      wallets: { ETH: _testWalletsEth },
    }

    it('sets active view to Send view', () => {
      const state = walletReducer(
        {
          ...initialState,
          ...requiredPart,
          activeView: WalletView.About,
        },
        actions.openSendInitialView(payload),
      )

      expect(state.activeView).toBe(WalletView.Send)
    })

    it('moves active view to previous', () => {
      const state = walletReducer(
        {
          ...initialState,
          ...requiredPart,
          activeView: WalletView.Send,
        },
        actions.openSendInitialView(payload),
      )

      expect(state.previousView).toBe(WalletView.Send)
    })

    it('sets active wallet to payload value', () => {
      const state = walletReducer(
        {
          ...initialState,
          ...requiredPart,
        },
        actions.openSendInitialView(payload))

      expect(state.activeWallet?.name).toBe(payload.name)
    })
  })

  describe('Handles `openSendConfirmView` action', () => {
    const payload = {
      wallet: _testWalletsEth[0],
      address: 'testAddtress',
      amount: 1000,
      fee: '10',
    }

    it('sets active view to SendConfirmation view', () => {
      const state = walletReducer(
        {
          ...initialState,
          activeView: WalletView.About,
        },
        actions.openSendConfirmView(payload),
      )

      expect(state.activeView).toBe(WalletView.SendConfirmation)
    })

    it('moves active view to previous', () => {
      const state = walletReducer(
        {
          ...initialState,
          activeView: WalletView.Send,
        },
        actions.openSendConfirmView(payload),
      )

      expect(state.previousView).toBe(WalletView.Send)
    })

    it('sets active wallet from payload value', () => {
      const state = walletReducer(initialState, actions.openSendConfirmView(payload))

      expect(state.activeWallet?.name).toBe(payload.wallet.name)
    })
  })
})
