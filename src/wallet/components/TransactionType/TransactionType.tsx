import { cn } from '@bem-react/classname'
import { TransferType } from 'shared/models'
import { TransactionType as TrType } from 'shared/models/transaction'

import './TransactionType.scss'

const bem = cn('TransactionType')

type TransferTypeProps = {
   transferType: TrType
}

export const TransactionType: React.FC<TransferTypeProps> = ({ transferType }) => {

   const text = (transferType: TrType) => {
      let result

      switch (transferType) {
         case 'funds':
            result = 'Funds'
            break
         case 'publicToPublic':
            result = 'Tokens'
            break
         case 'publicToPrivate':
            result = 'Deposit'
            break
         case 'privateToPublic':
            result = 'Withdraw'
            break
         case 'privateToPrivate':
            result = 'Transfer'
            break
         default:
            result = 'unknown'
            break
      }

      return result
   }

   return (
      <div className={bem({ Private: !['funds', 'publicToPublic'].includes(transferType) })}  >
         {
            text(transferType)
         }
      </div>
   )
}
