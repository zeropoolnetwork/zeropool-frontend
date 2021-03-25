import React, { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import { Transaction } from './Transaction'
import { Transaction as Tr, TxStatus } from 'zeropool-api-js/lib/coins/transaction'

// This default export determines where your story goes in the story list
export default {
  title: 'Transaction',
  component: Transaction,
}

const Template: Story<ComponentProps<typeof Transaction>> = (args) => <Transaction {...args} />
const tr1: Tr = {
  status: 0,
  amount: '0.21',
  from: '0xA646dc3DD68338Ee960eA131cfc798D9bF66070d',
  to: '0xedd09e322B0b741508f72A5d2613B17C2f96891d',
  timestamp: 1616329084,
  blockHash: '0x36ee558c0e10023ad3c2de8ee5fc6ee369809920edbe3fbbd7009a2f25d4c5a3',
  hash: '0x084d420dbc7cce7c756b19213f5b4b42b2b179c495d50a45514d0c0219d8b879',
}

export const Transaction1 = Template.bind({})
Transaction1.args = {
  transaction: tr1,
}

export const Transaction2 = Template.bind({})
Transaction2.args = {
  transaction: {
    ...tr1,
    status: TxStatus.Pending,
    amount: '999',
  },
}
