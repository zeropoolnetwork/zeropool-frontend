import React from 'react'
import { cn } from '@bem-react/classname'

import './Transaction.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'

export const componentId = 'Transaction'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type TransactionProps = {}

export const Transaction: React.FC<TransactionProps> = () => {
  return (
    <div className={css()} data-testid={test()}>
      <h1> Transaction </h1>
    </div>
  )
}
