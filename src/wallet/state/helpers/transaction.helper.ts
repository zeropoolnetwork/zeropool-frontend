import moment from 'moment'

import { SortedTransactions } from 'wallet/state/models/sorted-transactions'

import { Transaction, TransactionType } from 'shared/models/transaction'
import { toPlainString } from 'shared/utils/toPlainString'
import { fixTimestamp } from 'shared/utils/fix-timestamp'

export type PrivateHistorySourceRecord = {
  pending: boolean
  type: number
  amount: bigint
  txHash: string
  from: string
  to: string
  timestamp: number
}

export type PublicHistorySourceRecord = {
  blockHash: string
  blockNumber: string
  confirmations: string
  contractAddress: string
  from: string
  functionName: string
  gas: string
  gasPrice: string
  gasUsed: string
  hash: string
  input: string
  isError: string
  methodId: string
  nonce: string
  timeStamp: string
  to: string
  transactionIndex: string
  txreceipt_status: string
  value: string
}

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
        debugger
        throw Error('Timestamps should have 13 digits!')
      }

      if (!index) {
        result.push({
          date: m(transaction.timestamp).format('D MMM YYYY'),
          transactions: [transaction],
        })
      } else {
        if (
          isAfter(
            lastElement(lastElement(result).transactions).timestamp || 0,
            transaction.timestamp || 0,
          )
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

const fromPrivateHistory = (
  record: PrivateHistorySourceRecord,
  fromBaseUnit: (value: string) => string,
  denominator: bigint,
): Transaction => ({
  status: record.pending ? 'pending' : 'success',
  type: getTransactionType(record.type),
  amount: fromBaseUnit(toPlainString(Number(BigInt(record.amount) * denominator))),
  blockHash: record.txHash,
  from: record.from,
  to: record.to,
  timestamp: fixTimestamp(record.timestamp),
})

const fromPublicHistory = (
  record: any,
  fromBaseUnit: (value: string) => string,
): Transaction => ({
  status: record.pending ? 'pending' : 'success',
  type: getTransactionType(0),
  amount: fromBaseUnit(toPlainString(record.amount)),
  blockHash: record.txHash,
  from: record.from,
  to: record.to,
  timestamp: fixTimestamp(record.timestamp),
})

function getTransactionType(type: number): TransactionType {
  switch (type) {
    case 1:
      return 'publicToPrivate'
    case 4:
      return 'privateToPublic'
    case 2:
    case 3:
    case 5:
      return 'privateToPrivate'
    default:
      return 'publicToPublic'
  }
}

const helper = {
  sortByDays,
  fromPrivateHistory,
  fromPublicHistory,
}

export default helper
