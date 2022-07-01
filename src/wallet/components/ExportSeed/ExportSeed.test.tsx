import React from 'react'
import { render } from '@testing-library/react'

import { ExportSeed, componentId, EditWalletProps } from './ExportSeed'

describe('ExportSeed', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<EditWalletProps>
  const testName = 'Export Seed'

  beforeEach(() => {
    outputSpy = jest.fn()
    component = (
      <ExportSeed
        onCancel={jest.fn()}
        onExport={jest.fn()}
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
