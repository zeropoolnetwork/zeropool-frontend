import { cn } from '@bem-react/classname'
import { TransferType } from 'shared/models'

import './TransactionType.scss'

const bem = cn('TransactionType')

type TransferTypeProps = {
   transferType: TransferType
}

export const TransactionType: React.FC<TransferTypeProps> = ({ transferType }) => {

   const text = (transferType: TransferType) => {
      let result
      console.log("Input:", transferType)
      switch (transferType) {
         case 'funds':
            result = 'funds'
            break
         case 'publicToPublic':
            result = 'public to public'
            break
         case 'publicToPrivate':
            result = 'public to private'
            break
         case 'privateToPublic':
            result = 'private to public'
            break
         case 'privateToPrivate':
            result = 'private to private'
            break
         default:
            result = 'unknown'
            break
      }
      console.log("Output:", result)

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
