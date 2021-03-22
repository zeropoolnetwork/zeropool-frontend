import React from 'react'
import { render } from '@testing-library/react'

import { Transaction, componentId, TransactionProps } from './Transaction'

describe('Transaction', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<TransactionProps>

  beforeEach(() => {
    outputSpy = jest.fn()
    component = <Transaction />
  })

  it('should render component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })
})
