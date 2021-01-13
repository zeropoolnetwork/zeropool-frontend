import { createAction as create } from 'typesafe-actions';

import { Token } from 'shared/models/token';

import { WalletView } from 'wallet/state/models/wallet-view';

export const walletActions = {
  openBalanceView: create('@wallet/openBalanceView')<void>(),
  openWalletsView: create('@wallet/openWalletsView')<Token>(),
  openAddressView: create('@wallet/openAddressView')<Token>(),

  getRates: create('@wallet/getRates')<void>(),
  getRatesSuccess: create('@wallet/getRatesSuccess')<Record<Token['name'], number>>(),

  headerBack: create('@wallet/header/back')<void>(),
  menu: create('@wallet/menu')<WalletView>(),

  receive: create('@wallet/receive')<void>(),
  send: create('@wallet/send')<void>(),
  edit: create('@wallet/edit')<void>(),
};
