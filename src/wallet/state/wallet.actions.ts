import { createAction as create } from 'typesafe-actions';

import { Token } from 'shared/models/token';

import { WalletView } from 'wallet/state/models/wallet-view';
import { Wallet } from 'wallet/state/models/wallet';
import { CoinType } from 'zeropool-api-js/lib/coins/coin-type';

export const walletActions = {
  openBalanceView: create('@wallet/openBalanceView')<void>(), // called once on wallet component first load
  openWalletsView: create('@wallet/openWalletsView')<Token>(),
  openAddressView: create('@wallet/openAddressView')<Token>(),
  openReceiveView: create('@wallet/openReceiveView')<Wallet>(),
  openSendInitialView: create('@wallet/openSendInitialView')<Wallet>(),
  openSendConfirmView: create('@wallet/openSendConfirmView')<{ wallet: Wallet, address: string, amount: number }>(),

  setBalances: create('@wallet/setBalances')<{ balances: { [key in CoinType]?: string | Error }}>(),

  getRates: create('@wallet/getRates')<void>(),
  getRatesSuccess: create('@wallet/getRatesSuccess')<Record<Token['name'], number>>(),

  headerBack: create('@wallet/header/back')<void>(),

  menu: create('@wallet/menu')<WalletView>(),
  edit: create('@wallet/edit')<{wallet: Wallet, name: string}>(),
  send: create('@wallet/send')<void>(),

  setSeed: create('@wallet/setSeed')<{ seed: string }>(),
  setSeedError: create('@wallet/setSeedError')<void>(),

  addWallet: create('@wallet/addWallet')<void>(),
  hideWallet: create('@wallet/hideWallet')<{ wallet: Wallet }>(),
  
  resetAccount: create('@wallet/resetAccount')<void>(),
};
