import moment from 'moment'
import { SortedTransactions } from 'wallet/state/models/sorted-transactions'
import { Transaction } from 'shared/models/transaction'

const sortByDays = (transactions: Transaction[]) => {
  const result: SortedTransactions[] = []
  const lastElement = <T>(arr: T[]) => arr[arr.length - 1]
  const m = moment
  const isAfter = (
    currentTimestamp: number,
    lastTimestamp: number,
    check: 'day' | 'week' | 'month' = 'day',
  ): boolean => m(currentTimestamp).isAfter(m(lastTimestamp), check)

  transactions
    .slice(0)
    .reverse()
    .forEach((transaction, index) => {
      if ((transaction.timestamp + '').length !== 13) {
        throw Error('Timestamps should have 13 digits!')
      }

      if (!index) {
        result.push({
          date: m(transaction.timestamp).format('D MMM YYYY'),
          transactions: [transaction],
        })
      } else {
        if (
          isAfter(lastElement(lastElement(result).transactions).timestamp || 0, transaction.timestamp || 0)
        ) {
          result.push({
            date: m(transaction.timestamp).format('D MMM YYYY'),
            transactions: [transaction],
          })
        } else {
          lastElement(result).transactions.push(transaction)
        }
      }
    })

  return result
}

const helper = {
  sortByDays,
}

export default helper
