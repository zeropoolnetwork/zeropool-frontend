import { Transaction } from 'shared/models/transaction'

export type SortedTransactions = {
  date: string
  transactions: Transaction[]
}
