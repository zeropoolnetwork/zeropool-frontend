import { render } from '@testing-library/react'
import { TransferType } from 'shared/models'
import { TransactionType } from 'wallet/components/TransactionType/TransactionType'

let transferType: TransferType

let createComponent = (transferType: TransferType) => {
   return <TransactionType transferType={transferType} />
}

describe('TransactionType', () => {
   let component: React.ReactElement<TransferType>

   it('it renders component with funds text', () => {
      transferType = 'funds'

      const { getByText } = render(createComponent(transferType))

      expect(getByText('Funds')).toBeInTheDocument()
   })

   it('it renders component with Public to Public text', () => {
      transferType = 'publicToPublic'

      const { getByText } = render(createComponent(transferType))

      expect(getByText('Tokens')).toBeInTheDocument()
   })

   it('it renders component with Public to Private text', () => {
      transferType = 'publicToPrivate'

      const { getByText } = render(createComponent(transferType))

      expect(getByText('Deposit')).toBeInTheDocument()
   })

   it('it renders component with Private to Public text', () => {
      transferType = 'privateToPublic'

      const { getByText } = render(createComponent(transferType))

      expect(getByText('Withdraw')).toBeInTheDocument()
   })

   it('it renders component with Private to Private text', () => {
      transferType = 'privateToPrivate'

      const { getByText } = render(createComponent(transferType))

      expect(getByText('Transfer')).toBeInTheDocument()
   })

})