import React from 'react'
import { cn } from '@bem-react/classname'
import { Tooltip } from '@material-ui/core'
import CallMadeIcon from '@material-ui/icons/CallMade'
import CallReceivedIcon from '@material-ui/icons/CallReceived'

import './Transaction.scss'

import { Transaction as Tr } from 'wallet/state/models/transaction'
import { Wallet } from 'wallet/state/models'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { beautifyAdress, beautifyAmount } from 'shared/helpers/addres.helper'

export const componentId = 'Transaction'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type TransactionProps = {
  transaction: Tr
  wallet: Wallet
}

export const Transaction: React.FC<TransactionProps> = ({ transaction, wallet }) => {
  let isIncoming: boolean

  if (wallet.address.toLowerCase() === transaction.to.toLocaleLowerCase()) {
    isIncoming = true
  } else {
    isIncoming = false
  }

  return (
    <div className={css()} data-testid={test()}>
      <span>
        {' '}
        {isIncoming ? (
          <CallMadeIcon className={css('Icon')} />
        ) : (
          <CallReceivedIcon className={css('Icon')} />
        )}{' '}
      </span>

      <span className={css('Direction')}> {isIncoming ? 'From :' : 'To :'} </span>

      <span className={css('Adress')}>
        {' '}
        <Tooltip title={isIncoming ? transaction.from : transaction.to} placement="bottom">
          <span>{beautifyAdress(isIncoming ? transaction.from : transaction.to, 6)}</span>
        </Tooltip>
      </span>

      <span className={css('Amount')}>
        {' '}
        <Tooltip title={transaction.amount} placement="bottom">
          <span>
            {isIncoming ? '+' : '-'} {beautifyAmount(transaction.amount)} {wallet.token.symbol}
          </span>
        </Tooltip>
      </span>
    </div>
  )
}
