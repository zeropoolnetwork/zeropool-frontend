import React from 'react'
import { render } from '@testing-library/react'

import { Recovery, componentId, RecoveryProps } from './Recovery'

describe('ExportSeed', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<RecoveryProps>
  const testName = 'Recover your wallet'

  beforeEach(() => {
    outputSpy = jest.fn()
    component = (
      <Recovery
        onReset={jest.fn()}
        onRecover={jest.fn()}
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
