import { TransferType } from 'shared/models'

export type TransactionType = TransferType | 'deposit' | 'withdraw' | 'mint'
export type TransactionStatus =
  'started' |
  'pending' |
  'success' |
  'failed'

export type Transaction = {
  status: TransactionStatus,
  type: TransactionType,
  amount?: string,
  blockHash?: string,
  error?: string,
  from?: string,
  jobId?: string,
  to?: string,
  timestamp?: number,
}

export const transaction = (type: TransactionType, status: TransactionStatus, error?: string): Transaction => ({
  error,
  status,
  type,
})

