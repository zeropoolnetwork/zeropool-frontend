import React from 'react'
import { cn } from '@bem-react/classname'
import { Tooltip } from '@mui/material'
import { CallMade } from '@mui/icons-material'
import { CallReceived } from '@mui/icons-material'

import './Transaction.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { beautifyAddress, beautifyAmount } from 'shared/helpers/addres.helper'

export const componentId = 'Transaction'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type TransactionProps = {
  transaction: any
  address: string
}

export const Transaction: React.FC<TransactionProps> = ({ transaction, address }) => {
  let isIncoming: boolean

  if (address.toLowerCase() === transaction.to.toLocaleLowerCase()) {
    isIncoming = true
  } else {
    isIncoming = false
  }

  return (
    <div className={css()} data-testid={test()}>
      <span>
        {' '}
        {isIncoming ? (
          <CallReceived className={css('Icon')} />
        ) : (
          <CallMade className={css('Icon')} />
        )}{' '}
      </span>

      <span className={css('Direction')}> {isIncoming ? 'From :' : 'To :'} </span>

      <span className={css('Adress')}>
        {' '}
        <Tooltip title={isIncoming ? transaction.from : transaction.to} placement="bottom">
          <span>{beautifyAddress(isIncoming ? transaction.from : transaction.to, 6)}</span>
        </Tooltip>
      </span>

      <span className={css('Amount')}>
        {' '}
        <Tooltip title={transaction.amount} placement="bottom">
          <span>
            {isIncoming ? '+' : '-'} {beautifyAmount(transaction.amount)}
          </span>
        </Tooltip>
      </span>
    </div>
  )
}
