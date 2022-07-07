export type TransferType = 'funds' | 'publicToPublic' | 'publicToPrivate' | 'privateToPublic' | 'privateToPrivate';
export type TransferStatus = 'pending' | 'success' | 'failed';
export type TransferData = {
  id: number;
  type: TransferType;
  amount: string;
  to: string;
}
