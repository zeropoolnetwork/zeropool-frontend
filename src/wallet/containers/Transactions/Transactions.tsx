import React from 'react'
import { cn } from '@bem-react/classname'

import './Transactions.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'

import { Wallet } from 'wallet/state/models'

export const componentId = 'Transactions'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type TransactionsProps = {
  wallet: Wallet
}

export const Transactions: React.FC<TransactionsProps> = ({ wallet }) => {
  return (
    <div className={css()} data-testid={test()}>
      <h1> Transactions page is under construction</h1>
    </div>
  )
}
