import React from 'react'
import { cn } from '@bem-react/classname'
import { CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import './Transactions.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'

import { Wallet } from 'wallet/state/models'
import { getTransactions } from 'wallet/state/wallet.selectors'
import { Transaction } from 'wallet/state/models/transaction'

export const componentId = 'Transactions'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type TransactionsProps = {
  wallet: Wallet
}

export const Transactions: React.FC<TransactionsProps> = ({ wallet }) => {
  const dispatch = useDispatch()
  const transactions = useSelector(getTransactions)

  const incoming = (transaction: Transaction) =>
    wallet.address.toLowerCase() === transaction.to.toLocaleLowerCase()

  return (
    <div className={css()} data-testid={test()}>
      {transactions ? (
        transactions.map((transaction, i) => (
          <div className={css('Transaction')} key={i}>
            <span>{incoming(transaction) ? '<--  ' : '-->  '}</span>

            {incoming(transaction) ? (
              <span>
                <b>From: </b>
                {transaction.from}
              </span>
            ) : (
              <span>
                <b>To: </b> {transaction.to}
              </span>
            )}

            <span>
              <b>
                {' ' + transaction.amount} {wallet.token.symbol}
              </b>
            </span>
          </div>
        ))
      ) : (
        <CircularProgress />
      )}
    </div>
  )
}
