import { render } from '@testing-library/react'
import { TransactionTime } from 'wallet/components/TransactionTime/TransactionTime'

describe('TransactionType', () => {
   it('it renders component with transaction time', () => {
      const timestamp = 1667556293370
      const resultTime = new Date(timestamp)
      const showingTime = `${resultTime.getHours()}:${resultTime.getMinutes()}`

      const { getByText } = render(<TransactionTime time={timestamp} />)

      expect(getByText(showingTime)).toBeInTheDocument()
   })

   it('it shows - when invalid timestamp', () => {
      const timestamp = 'invalid timestamp' as any

      const { getByText } = render(<TransactionTime time={timestamp} />)

      expect(getByText('-')).toBeInTheDocument()
   })
})