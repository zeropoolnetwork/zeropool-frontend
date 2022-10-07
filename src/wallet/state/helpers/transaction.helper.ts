import moment from 'moment'
import { SortedTransactions } from 'wallet/state/models/sorted-transactions'
import { Transaction, TransactionStatus, TransactionType } from 'shared/models/transaction'

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

const fromHistory = (
  record: any,
  fromBaseUnit: (value: string) => string,
  denominator: bigint,
): Transaction => {
  return {
    status: record.pending ? 'pending' : 'success',
    type: getTransactionType(record.type),
    amount: fromBaseUnit(Number(record.amount * denominator).toString()),
    blockHash: record.txHash,
    // error: string
    from: record.from,
    // jobId: string
    to: record.to,
    timestamp: Number(record.timestamp) * 1000,
  }

}

function getTransactionType(type: number): TransactionType {
  switch (type) {
    case 1:
      return 'publicToPrivate';
    case 4:
      return 'privateToPublic';
    case 2:
    case 3:
    case 5:
      return 'privateToPrivate';
    default:
      return 'publicToPublic';
  }
}

const helper = {
  sortByDays,
  fromHistory,
}

export default helper
