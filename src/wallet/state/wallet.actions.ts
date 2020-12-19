import { createAction as create } from 'typesafe-actions';

import { Token } from 'shared/models/token';

import { WalletView } from 'wallet/state/models/wallet-view';

export const walletActions = {
  openWallet: create('@wallet/openWallet')<boolean | void>(),

  getRates: create('@wallet/getRates')<void>(),
  getRatesSuccess: create('@wallet/getRatesSuccess')<Record<Token['name'], number>>(),

  menu: create('@wallet/menu')<WalletView>(),
};
