import React from 'react'
import { render } from '@testing-library/react'

import { Transfer, componentId, TransferProps } from './Transfer'

describe('Transfer', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<TransferProps>
  const testName = 'Transfer'

  beforeEach(() => {
    outputSpy = jest.fn()
    component = (
      <Transfer
        onCancel={jest.fn()}
        onSubmit={jest.fn()}
      />
    )
  })

  it('should render component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })

  it('contains Header', () => {
    const { getByTestId, getByText } = render(component)

    expect(getByText(testName)).toBeInTheDocument()
  })
})
