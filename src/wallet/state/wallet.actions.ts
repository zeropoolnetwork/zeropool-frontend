import { createAction as create } from 'typesafe-actions';

import { Token } from 'shared/models/token';

import { WalletView } from 'wallet/state/models/wallet-view';
import { Wallet } from 'wallet/state/models/wallet';

export const walletActions = {
  openBalanceView: create('@wallet/openBalanceView')<void>(),
  openWalletsView: create('@wallet/openWalletsView')<Token>(),
  openAddressView: create('@wallet/openAddressView')<Token>(),
  openReceiveView: create('@wallet/openReceiveView')<Wallet>(),
  openSendInitialView: create('@wallet/openSendInitialView')<Wallet>(),
  openSendConfirmView: create('@wallet/openSendConfirmView')<{ wallet: Wallet, address: string, amount: number }>(),

  getRates: create('@wallet/getRates')<void>(),
  getRatesSuccess: create('@wallet/getRatesSuccess')<Record<Token['name'], number>>(),

  headerBack: create('@wallet/header/back')<void>(),
  menu: create('@wallet/menu')<WalletView>(),

  edit: create('@wallet/edit')<Wallet>(),

  send: create('@wallet/send')<void>(),

  setSeed: create('@wallet/setSeed')<string>(),
  addWallet: create('@wallet/addWallet')<number>(),
  hideWallet: create('@wallet/hideWallet')<number>(),
};
