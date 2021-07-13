import { _testToken, _testWalletsEth, _testWalletsNear } from 'shared/helpers/test/app-state.helper'
import { deepFreeze } from 'shared/util/deep-freeze'
import { action } from 'typesafe-actions'
import { WalletView } from 'wallet/state/models'

import { walletActions as actions } from 'wallet/state/wallet.actions'

import { initialWalletState, walletReducer, WalletState } from './wallet.reducer'

describe('wallet reducer', () => {
  const initialState: WalletState = deepFreeze(initialWalletState)

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

    it('does not affect state if it has no active token and wallets array', () => {
      const state = walletReducer(initialState, actions.openReceiveView(payload))

      expect(state).toEqual(initialState)
    })

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

    it('does not affect state if it has no active token and wallets array', () => {
      const state = walletReducer(initialState, actions.openSendInitialView(payload))

      expect(state).toEqual(initialState)
    })

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

  describe('Handles `getTransactionsSuccess` action', () => {
    const payload = [{ 1: 1 }, { 2: 2 }] as any

    it('saves transactions array to the state', () => {
      const state = walletReducer(initialState, actions.getTransactionsSuccess(payload))

      expect(state.transactions).toEqual(payload)
    })
  })

  describe('Handles `setSeed` action', () => {
    const payload = '1234567test'

    it('saves transactions array to the state', () => {
      const state = walletReducer(initialState, actions.setSeed(payload))

      expect(state.seed).toEqual(payload)
    })
  })

  describe('Handles `updateWalletsSuccess` action', () => {
    const payload = { TEST: [..._testWalletsEth, { address: '0x123test', amount: 123 } as any] }

    it('saves wallets record to the state', () => {
      const state = walletReducer(initialState, actions.updateWalletsSuccess(payload))

      expect(state.wallets).toEqual(payload)
    })

    it('resets activeWallet prop if state has no active token and active wallet', () => {
      const state = walletReducer(initialState, actions.updateWalletsSuccess(payload))

      expect(state.activeWallet).toBe(null)
    })

    it('updates activeWallet prop if state has active token and active wallet', () => {
      const state = walletReducer(
        {
          ...initialState,
          activeToken: { symbol: 'TEST' } as any,
          activeWallet: { address: '0x123test', amount: 666 } as any,
        },
        actions.updateWalletsSuccess(payload),
      )

      expect(state.activeWallet?.amount).toBe(123)
    })
  })

  describe('Handles `refreshAmounts` action', () => {
    it.todo('recalculates amounts');
  });

  describe('Handles `resetAccount` action', () => {
    it('resets account state', () => {
      const oldState: WalletState = {
        ...initialWalletState, 
        activeToken: _testToken,
        seed: 'hi',
        privateAddress: 'bla-bla-bla', 
      }
      const newState = walletReducer(oldState, actions.resetAccount())

      expect(newState).toEqual(initialWalletState)
    });
  });

  describe('Handles `edit` action', () => {
    it('does not change state if no active token', () => {
      const oldState: WalletState = {
        ...initialWalletState, 
        seed: 'hi',
        privateAddress: 'bla-bla-bla', 
        wallets: { test: _testWalletsEth },
      }
      const newState = walletReducer(oldState, actions.edit({
        wallet: _testWalletsEth[1],
        name: 'test name',
      }))

      expect(newState).toEqual(oldState)
    });

    it('does not change state if no wallets', () => {
      const oldState: WalletState = {
        ...initialWalletState, 
        seed: 'hi',
        privateAddress: 'bla-bla-bla', 
        activeToken: _testToken ,
      }
      const newState = walletReducer(oldState, actions.edit({
        wallet: _testWalletsEth[1],
        name: 'test name',
      }))

      expect(newState).toEqual(oldState)
    });

    it('renames wallet if state has active token and wallets', () => {
      const oldState: WalletState = {
        ...initialState,
        activeToken: {
          ..._testToken,
          symbol: 'test'
        },
        wallets: {
          test: _testWalletsEth,
        },
      }

      const newState = walletReducer(oldState, actions.edit({
        wallet: _testWalletsEth[0],
        name: 'test1'
      }))

      expect(newState.wallets && newState.wallets['test'][0].name).toEqual('test1')
    });
  });

  describe('Handles `addWalletSuccess` action', () => {
    it('saves wallets to state', () => {
      const oldState: WalletState = {
        ...initialWalletState, 
        wallets: { test: _testWalletsEth },
      }
      const newState = walletReducer(oldState, actions.addWalletSuccess({
        test2: _testWalletsNear,
      }))

      expect(newState.wallets && newState.wallets['test2']).toEqual(_testWalletsNear)
    });
  });

  describe('Handles `getRatesSuccess` action', () => {
    it('saves rates to state', () => {
      const oldState: WalletState = {
        ...initialWalletState, 
      }
      const newState = walletReducer(oldState, actions.getRatesSuccess({
        test1: 123,
        test2: 321,
      }))

      expect(newState.usdRates && newState.usdRates['test1']).toEqual(123)
    });
  });

  describe('Handles `hideWallet` action', () => {
    it('does not change state if no active token', () => {
      const oldState: WalletState = {
        ...initialWalletState, 
        wallets: { test: _testWalletsEth }
      }
      const newState = walletReducer(oldState, actions.hideWallet(_testWalletsEth[1]))

      expect(newState).toEqual(oldState)
    });

    it('does not change state if no wallets', () => {
      const oldState: WalletState = {
        ...initialWalletState, 
        activeToken: _testToken,
      }
      const newState = walletReducer(oldState, actions.hideWallet(_testWalletsEth[1]))

      expect(newState).toEqual(oldState)
    });

    it('removes wallet from state', () => {
      const oldState: WalletState = {
        ...initialWalletState, 
        activeToken: _testToken,
      }
      const newState = walletReducer(oldState, actions.hideWallet(_testWalletsEth[1]))

      expect(newState.wallets && newState.wallets[_testToken.symbol].find((item) =>
        _testWalletsEth[1].id !== item.id
      )).toBe(null)
    });
  });

  describe('Handles `menu` action', () => {
    it('does not change active view if reset flag in payload', () => {
      const oldState: WalletState = {
        ...initialWalletState, 
        activeView: WalletView.Balance,
      }
      const newState = walletReducer(oldState, actions.menu(WalletView.Reset))

      expect(newState).toEqual(oldState)
    });

    it('change active view if no reset flag in payload', () => {
      const oldState: WalletState = {
        ...initialWalletState, 
        activeView: WalletView.Balance,
      }
      const newState = walletReducer(oldState, actions.menu(WalletView.About))
      
      expect(newState.activeView).toEqual(WalletView.About)
    });
  })
})
