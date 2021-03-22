import { createAction as create } from 'typesafe-actions'

import { Token, TokenName } from 'shared/models/token'

import { WalletView } from 'wallet/state/models/wallet-view'
import { Wallet } from 'wallet/state/models/wallet'
import { WalletRecord } from './models'
import { Transaction } from 'zeropool-api-js/lib/coins/transaction'

export const walletActions = {
  apiError: create('@wallet/apiError')<string>(),

  addWallet: create('@wallet/addWallet')<void>(),
  addWalletSuccess: create('@wallet/addWalletSuccess')<WalletRecord>(),
  addWalletError: create('@wallet/addWalletError')<string>(),

  openBalanceView: create('@wallet/openBalanceView')<void>(), // called on wallet first load
  openWalletsView: create('@wallet/openWalletsView')<Token>(),
  openTransactionsView: create('@wallet/openTransactionsView')<Wallet>(), // Transactions View
  openReceiveView: create('@wallet/openReceiveView')<Wallet>(),
  openSendInitialView: create('@wallet/openSendInitialView')<Wallet>(),
  prepareSendConfirmView: create('@wallet/prepareSendConfirmView')<{
    wallet: Wallet
    address: string
    amount: number
  }>(),
  openSendConfirmView: create('@wallet/openSendConfirmView')<{
    wallet: Wallet
    address: string
    amount: number
    fee: number
  }>(),

  initWallets: create('@wallet/initWallets')<void>(),
  updateWallets: create('@wallet/updateWallets')<void>(),
  updateWalletsSuccess: create('@wallet/updateWalletsSuccess')<WalletRecord>(),
  updateWalletsError: create('@wallet/updateWalletsError')<string>(),

  getTransactions: create('@wallet/getTransactions')<Wallet>(),
  getTransactionsSuccess: create('@wallet/getTransactionsSussess')<Transaction[]>(),

  refreshAmounts: create('@wallet/refreshAmounts')<void>(),

  getRates: create('@wallet/getRates')<void>(),
  getRatesSuccess: create('@wallet/getRatesSuccess')<Record<TokenName, number>>(),
  getRatesError: create('@wallet/getRates')<string>(),

  headerBack: create('@wallet/header/back')<void>(),

  menu: create('@wallet/menu')<WalletView>(),
  edit: create('@wallet/edit')<{ wallet: Wallet; name: string }>(),
  send: create('@wallet/send')<void>(),

  setSeed: create('@wallet/setSeed')<string>(),
  setSeedSuccess: create('@wallet/setSeedSuccess')<void>(),
  setSeedError: create('@wallet/setSeedError')<string>(),

  hideWallet: create('@wallet/hideWallet')<Wallet>(),

  resetAccount: create('@wallet/resetAccount')<void>(),
}
