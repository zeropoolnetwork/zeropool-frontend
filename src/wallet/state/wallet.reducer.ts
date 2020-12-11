import { ActionType, createReducer } from 'typesafe-actions';

import { Token } from 'shared/models/token';

import { walletActions as actions } from 'wallet/state/wallet.actions';

export interface WalletState {
  walletName: string,
  isPrivate: boolean;
  supportedTokens: Token[],
  supportedTokensRecord: Record<Token['name'], Token>,
  usdRates: Record<Token['name'], number>
}

export const initialWalletState: WalletState = {
  walletName: 'Main wallet',
  isPrivate: false,
  supportedTokens: [{ id: 1027, name: "Ethereum", symbol: "ETH" }],
  supportedTokensRecord: { Ethereum: { id: 1027, name: "Ethereum", symbol: "ETH" } },
  usdRates: { Ethereum: 566.44 }
};

export const walletReducer = createReducer<
  WalletState,
  ActionType<typeof actions>
>(initialWalletState)
  .handleAction(actions.openWallet, (state, { payload }) => ({
    ...state,
    isPrivate: payload || false,
  }))
  .handleAction(actions.getRatesSuccess, (state, { payload }) => ({
    ...state,
    usdRates: payload,
  }));


