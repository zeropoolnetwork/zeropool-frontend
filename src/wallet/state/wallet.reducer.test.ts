import { deepFreeze } from "shared/util/deep-freeze";

import { walletActions as actions } from 'wallet/state/wallet.actions';

import { initialWalletState, walletReducer, WalletState } from "./wallet.reducer";

describe('wallet reducer', () => {
  const initialState: WalletState = deepFreeze(initialWalletState);

  it('handles `openWallet` action', () => {
    const state = walletReducer(
      initialState,
      actions.openWallet(),
    );

    expect(state.isPrivate).toBe(false);
  });

  it('handles `getRates` action', () => {
    const payload = { Ethereum: 600, Near: 1.2 }

    const state = walletReducer(
      initialState,
      actions.getRatesSuccess(payload),
    );

    expect(state.usdRates['Near']).toBe(1.2);
  });
});