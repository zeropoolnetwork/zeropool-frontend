import React, { MouseEvent } from 'react'
import { cn } from '@bem-react/classname'
import { Tooltip } from '@mui/material'
import { CallMade } from '@mui/icons-material'
import { CallReceived } from '@mui/icons-material'

import './Transaction.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { beautifyAddress, beautifyAmount } from 'shared/helpers/address.helper'
import { copyToClipboard } from 'shared/utils/copy-to-clipboard'
import { useSnackbar } from 'notistack'
import { TransactionType } from 'wallet/components/TransactionType/TransactionType'

export const componentId = 'Transaction'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type TransactionProps = {
  transaction: any
  address: string
}

export const Transaction: React.FC<TransactionProps> = ({ transaction, address }) => {
  let isIncoming: boolean

  const { enqueueSnackbar } = useSnackbar()
  const handleAddressClick = (event: MouseEvent<HTMLSpanElement>): void => {
    const address = (event.target as HTMLElement).ariaLabel

    copyToClipboard((address as string), 'Address', enqueueSnackbar)
  }
  function handleAmountClick() {
    const amount = transaction.amount

    copyToClipboard((amount as string), 'Amount', enqueueSnackbar)
  }

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
        <Tooltip onClick={handleAddressClick} title={isIncoming ? transaction.from : transaction.to} placement="bottom">
          <span style={{ cursor: 'pointer' }}>
            {beautifyAddress({ address: isIncoming ? transaction.from : transaction.to, limit: 9 })}
          </span>
        </Tooltip>
      </span>

      <span className={css('Amount')} >
        {' '}
        <Tooltip onClick={handleAmountClick} title={transaction.amount} placement="bottom">
          <span style={{ cursor: 'pointer' }}>
            {isIncoming ? '+' : '-'} {beautifyAmount(transaction.amount)}
          </span>
        </Tooltip>
      </span>

      <span className={css('TransactionType')}>
        <TransactionType
          transferType={transaction.type}
        ></TransactionType>
      </span>
    </div>
  )
}
