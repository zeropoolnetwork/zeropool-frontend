import { TransferType } from 'shared/models'

export type TransactionStatus =
  'started' | 
  'pending' | 
  'success' | 
  'failed'

export type Transaction = {
  amount?: string,
  blockHash?: string,
  error?: string,
  from?: string,
  hash?: string,
  status?: TransactionStatus,
  to?: string,
  timestamp?: number,
  type: TransferType | 'deposit' | 'withdraw' | 'mint',
}

