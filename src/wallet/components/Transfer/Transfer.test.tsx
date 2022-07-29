import React from 'react'
import { render } from '@testing-library/react'
import { useSnackbar } from 'notistack'

import { Transfer, componentId, TransferProps } from './Transfer'

jest.mock('shared/models')
jest.mock('shared/components/ZPSwitch/zpswitch')
jest.mock('shared/utils/copy-from-clipboard')
jest.mock('notistack', () => ({useSnackbar: jest.fn()}))
jest.mock('shared/utils/bad-amount', () => ({badAmount: jest.fn()}))

describe('Transfer', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<TransferProps>
  const testName = 'Transfer'

  beforeEach(() => {
    (useSnackbar as jest.Mock).mockImplementation(() => ({enqueueSnackbar: jest.fn()}))
    outputSpy = jest.fn()
    component = (
      <Transfer
        processing={false}
        onCancel={jest.fn()}
        onSubmit={jest.fn()}
        canTransfer={true}
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
