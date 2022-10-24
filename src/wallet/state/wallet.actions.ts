import { createAction as create } from '@reduxjs/toolkit'

import { Token, TokenName } from 'shared/models/token'

import { WalletView } from 'wallet/state/models/wallet-view'
import { Wallet } from 'wallet/state/models/wallet'
import { WalletRecord } from './models'

export const walletActions = {
  apiError: create<string>('wallet/apiError'),

  addWallet: create('wallet/addWallet'),
  addWalletSuccess: create<WalletRecord>('wallet/addWalletSuccess'),
  addWalletError: create<string>('wallet/addWalletError'),

  openBalanceView: create('wallet/openBalanceView'),
  openWalletsView: create<Token>('wallet/openWalletsView'),
  openTransactionsView: create<Wallet>('wallet/openTransactionsView'),
  openReceiveView: create<Wallet>('wallet/openReceiveView'),
  openSendInitialView: create<Wallet>('wallet/openSendInitialView'),
  prepareSendConfirmView: create<{
    wallet: Wallet
    address: string
    amount: number
  }>('wallet/prepareSendConfirmView'),
  openSendConfirmView: create<{
    wallet: Wallet
    address: string
    amount: number
    fee: string
  }>('wallet/openSendConfirmView'),

  initWallets: create('wallet/initWallets'),
  updateBalances: create('wallet/updateBalances'),
  updateWalletsSuccess: create<WalletRecord>('wallet/updateWalletsSuccess'),
  updateWalletsError: create<string>('wallet/updateWalletsError'),

  getTransactions: create<Wallet>('wallet/getTransactions'),
  getTransactionsSuccess: create<any[]>('wallet/getTransactionsSussess'),

  refreshAmounts: create('wallet/refreshAmounts'),

  getRates: create('wallet/getRates'),
  getRatesSuccess: create<Record<TokenName, number>>('wallet/getRatesSuccess'),
  getRatesError: create<string>('wallet/getRates'),

  headerBack: create('wallet/header/back'),

  menu: create<WalletView>('wallet/menu'),
  edit: create<{ wallet: Wallet; name: string }>('wallet/edit'),
  send: create('wallet/send'),

  setAccountId: create<string>('wallet/setAccountId'),

  setSeed: create<string>('wallet/setSeed'),
  setSeedSuccess: create('wallet/setSeedSuccess'),
  setSeedError: create<string>('wallet/setSeedError'),

  hideWallet: create<Wallet>('wallet/hideWallet'),

  resetAccount: create('wallet/resetAccount'),

  getPrivateAddress: create<Token>('wallet/getPrivateAddress'),
  getPrivateAddressSuccess: create<string>('wallet/getPrivateAddressSuccess'),
}
