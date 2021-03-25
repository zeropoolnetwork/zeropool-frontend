import React from 'react'
import { cn } from '@bem-react/classname'

import './Transaction.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { Transaction as Tr } from 'wallet/state/models/transaction'
import { beautifyAdress } from 'shared/helpers/addres.helper'

export const componentId = 'Transaction'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type TransactionProps = {
  transaction: Tr
}

export const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
  return (
    <div className={css()} data-testid={test()}>
      <h3> Transaction amount: {transaction.amount} </h3>
      <h4> From: {beautifyAdress(transaction.from, 6)} </h4>
    </div>
  )
}
