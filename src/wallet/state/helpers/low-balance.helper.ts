import { TransferType } from 'shared/models'

export const lowBalanceHelper = (
  transferType: TransferType,
  amount?: string,
  publicBalance?: string,
  tokenBalance?: string,
  privateBalance?: string,
): boolean => {
  switch (transferType) {
    case 'funds':
      return !publicBalance || !amount || +publicBalance < +amount
    case 'privateToPrivateOut':
    case 'privateToPublic':
      return !privateBalance || !amount || +privateBalance < +amount
    case 'publicToPrivate':
    case 'publicToPublic':
      return !tokenBalance || !amount || +tokenBalance < +amount
    default:
      return false
  }
}
