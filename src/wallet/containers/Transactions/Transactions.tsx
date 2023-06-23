import { cn } from '@bem-react/classname'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { Button, CircularProgress } from '@mui/material'

import './Transactions.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { isErrorWithMessage } from 'shared/utils/is-error-with-message'

import { Transaction as TransactionRow } from 'wallet/components/Transaction/Transaction'
import { SortedTransactions } from 'wallet/state/models/sorted-transactions'
import transactionHelper from 'wallet/state/helpers/transaction.helper'
import { Transaction } from 'shared/models/transaction'

export const componentId = 'Transactions'

const bem = cn(componentId)
const test = testIdBuilder(componentId)

export type TransactionsProps = {
  transactions: Transaction[] | undefined
  address: string
  onClose: () => void
}

export const Transactions: React.FC<TransactionsProps> = ({
  transactions,
  address,
  onClose,
}) => {
  let sorted: SortedTransactions[] = []
  const { enqueueSnackbar } = useSnackbar()
  const [opened, setOpened] = useState<boolean[]>([])

  const openHandler = (index: number) => {
    const arr = [...opened]

    arr[index] = !opened[index]
    setOpened(arr)
  }

  if (transactions?.length) {
    try {
      sorted = transactionHelper.sortByDays(transactions)

      if (!opened.length) {
        const arr: boolean[] = []

        sorted.forEach(() => arr.push(false))
        arr[0] = true
        setOpened(arr)
      }
    } catch (err) {
      if (isErrorWithMessage(err)) {
        enqueueSnackbar(err.message, { variant: 'error' })
      }
    }
  }

  return (
    <div className={bem()} data-testid={test()}>
      <div className={bem('Days')}>
        {!transactions ? (
          <CircularProgress sx={{ margin: 'auto' }} />
        ) : transactions.length === 0 ? (
          <div className={bem('Empty')}>No records</div>
        ) : (
          sorted.map((day, i) => (
            <div className={bem('Day')} key={i}>
              <div className={bem('Date')}>
                <span
                  className={bem('Arrow', { Down: opened[i] })}
                  onClick={() => openHandler(i)}
                >
                  {'>'}
                </span>

                {' ' + day.date}
              </div>

              {day.transactions.map((transaction, j) => (
                <div className={bem('TransactionRow', { Open: opened[i] })} key={j}>
                  <TransactionRow transaction={transaction} key={j} address={address} />
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      <div className={bem('Close')}>
        <Button color="primary" variant="contained" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}
