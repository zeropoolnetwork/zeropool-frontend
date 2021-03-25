import { Transaction } from 'wallet/state/models/transaction'

export type SortedTransactions = {
  date: string
  transactions: Transaction[]
}
