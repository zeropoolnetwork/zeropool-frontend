import React from 'react'
import { render } from '@testing-library/react'

import { ConfirmReset, componentId, EditWalletProps } from './ConfirmReset'

describe('ConfirmReset', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<EditWalletProps>
  const testName = 'Confirm Reset'

  beforeEach(() => {
    outputSpy = jest.fn()
    component = (
      <ConfirmReset
        onCancel={jest.fn()}
        onReset={jest.fn()}
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
