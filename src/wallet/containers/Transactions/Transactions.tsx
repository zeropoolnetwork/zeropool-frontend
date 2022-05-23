import React, { useState } from 'react'
import { cn } from '@bem-react/classname'
import { useSnackbar } from 'notistack'
import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'

import './Transactions.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { isErrorWithMessage } from 'shared/util/is-error-with-message'

import { SortedTransactions } from 'wallet/state/models/sorted-transactions'
import { getTransactions } from 'wallet/state/wallet.selectors'
import transactionHelper from 'wallet/state/helpers/transaction.helper'
import { Transaction } from 'wallet/components/Transaction/Transaction'
import { Wallet } from 'wallet/state/models'

export const componentId = 'Transactions'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type TransactionsProps = {
  wallet: Wallet
}

export const Transactions: React.FC<TransactionsProps> = ({ wallet }) => {
  let sorted: SortedTransactions[] = []
  const transactions = useSelector(getTransactions)
  const { enqueueSnackbar } = useSnackbar()
  const [opened, setOpened] = useState<boolean[]>([])

  const incoming = (transaction: any) =>
    wallet.address.toLowerCase() === transaction.to.toLocaleLowerCase()

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
    <div className={css()} data-testid={test()}>
      {transactions ? (
        sorted.map((day, i) => (
          <div className={css('Day')} key={i}>
            <div className={css('Date')}>
              <span className={css('Arrow', { Down: opened[i] })} onClick={() => openHandler(i)}>
                {'>'}
              </span>

              {' ' + day.date}
            </div>

            {day.transactions.map((transaction, j) => (
              <div className={css('TransactionRow', { Open: opened[i] })} key={j}>
                <Transaction transaction={transaction} key={j} wallet={wallet} />
              </div>
              //   <span>{incoming(transaction) ? '<--  ' : '-->  '}</span>

              //   {incoming(transaction) ? (
              //     <span>
              //       <b>From: </b>
              //       {beautifyAddress(transaction.from)}
              //     </span>
              //   ) : (
              //     <span>
              //       <b>To: </b> {beautifyAddress(transaction.to)}
              //     </span>
              //   )}

              //   <span>
              //     <b>
              //       {' ' + transaction.amount} {wallet.token.symbol}
              //     </b>
              //   </span>
              // </div>
            ))}
          </div>
        ))
      ) : (
        <CircularProgress />
      )}
    </div>
  )
}
