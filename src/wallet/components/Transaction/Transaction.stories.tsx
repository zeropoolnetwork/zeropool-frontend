import { ComponentProps } from 'react'

import { Transaction } from './Transaction'

import { Transaction as Tr } from 'zeropool-api-js/lib/coins/transaction'

import { _testWalletsEth } from 'shared/helpers/test/app-state.helper'
import { Wallet } from 'wallet/state/models'

type TransactionArgs = ComponentProps<typeof Transaction>

// This default export determines where your story goes in the story list
export default {
  title: 'Transaction',
  component: Transaction,
}

const wallet: Wallet = {
  id: 0,
  account: 0,
  name: 'Test Wallet',
  amount: 0,
  address: '0xedd09e322B0b741508f72A5d2613B17C2f96891d',
  token: { id: 1, symbol: 'TEST', name: 'testName' },
}

const trIncoming: Tr = {
  status: 0,
  amount: '0.21',
  from: '0xA646dc3DD68338Ee960eA131cfc798D9bF66070d',
  to: '0xedd09e322B0b741508f72A5d2613B17C2f96891d',
  timestamp: 1616329084,
  blockHash: 'something',
  hash: 'something',
}

const trOutgoing: Tr = {
  status: 0,
  amount: '0.21',
  from: '0xedd09e322B0b741508f72A5d2613B17C2f96891d',
  to: '0xA646dc3DD68338Ee960eA131cfc798D9bF66070d',
  timestamp: 1616329084,
  blockHash: 'something',
  hash: 'something',
}

export const incomingTransaction = (args: TransactionArgs) => <Transaction {...args} />

incomingTransaction.args = {
  transaction: trIncoming,
  wallet,
}

export const outgoingTransaction = (args: TransactionArgs) => <Transaction {...args} />

outgoingTransaction.args = {
  transaction: {
    ...trOutgoing,
    amount: '999',
  },
  wallet,
}
