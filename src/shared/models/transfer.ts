export type TransferType = 'publicToPublic' | 'publicToPrivate' | 'privateToPublic' | 'privateToPrivate';
export type TransferStatus = 'pending' | 'success' | 'failed';
export type TransferData = {
  id: number;
  type: TransferType;
  amount: string;
  from: string;
  to: string;
}
