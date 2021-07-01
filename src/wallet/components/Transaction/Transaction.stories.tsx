import React, { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import { Transaction } from './Transaction'

import { Transaction as Tr, TxStatus } from 'zeropool-api-js/lib/coins/transaction'

import { _testWalletsEth } from 'shared/helpers/test/app-state.helper'
import { Wallet } from 'wallet/state/models'

// This default export determines where your story goes in the story list
export default {
  title: 'Transaction',
  component: Transaction,
}

const Template: Story<ComponentProps<typeof Transaction>> = (args) => <Transaction {...args} />

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
  blockHash: '0x36ee558c0e10023ad3c2de8ee5fc6ee369809920edbe3fbbd7009a2f25d4c5a3',
  hash: '0x084d420dbc7cce7c756b19213f5b4b42b2b179c495d50a45514d0c0219d8b879',
}

const trOutgoing: Tr = {
  status: 0,
  amount: '0.21',
  from: '0xedd09e322B0b741508f72A5d2613B17C2f96891d',
  to: '0xA646dc3DD68338Ee960eA131cfc798D9bF66070d',
  timestamp: 1616329084,
  blockHash: '0x36ee558c0e10023ad3c2de8ee5fc6ee369809920edbe3fbbd7009a2f25d4c5a3',
  hash: '0x084d420dbc7cce7c756b19213f5b4b42b2b179c495d50a45514d0c0219d8b879',
}

export const IncomingTransaction = Template.bind({})

IncomingTransaction.args = {
  transaction: trIncoming,
  wallet,
}

export const OutgoingTransaction = Template.bind({})

OutgoingTransaction.args = {
  transaction: {
    ...trOutgoing,
    status: TxStatus.Pending,
    amount: '999',
  },
  wallet,
}
