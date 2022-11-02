export type TransferType =
  | 'funds'
  | 'loopback'
  | 'publicToPublic'
  | 'publicToPrivate'
  | 'privateToPublic'
  | 'privateToPrivateIn'
  | 'privateToPrivateOut'
export type TransferStatus = 'pending' | 'success' | 'failed'
export type TransferData = {
  id: number
  type: TransferType
  amount: string
  to: string
}
