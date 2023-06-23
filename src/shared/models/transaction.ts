import { TransferType } from 'shared/models'

export type TransactionType = TransferType | 'deposit' | 'withdraw' | 'mint'
export type TransactionStatus = 'started' | 'pending' | 'success' | 'failed'

export type Transaction = {
  status: TransactionStatus
  type: TransactionType
  amount: string
  blockHash?: string
  error?: string
  from: string
  jobId?: string
  to: string
  timestamp: number
}

export const transaction = (
  type: TransactionType,
  status: TransactionStatus,
  error?: string,
): Transaction => ({
  error,
  status,
  type,
  amount: '0',
  from: '',
  to: '',
  timestamp: 0,
})

// Copy of Support JS lib Transaction interface
export interface PublicTransactionSource {
  hash: string
  blockHash: string
  status: 0 | 1 | 2
  amount: string
  from: string
  to: string
  /** UNIX timestamp in seconds */
  timestamp: number
}
