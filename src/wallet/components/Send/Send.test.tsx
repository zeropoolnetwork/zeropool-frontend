import React from 'react'
import { useSnackbar } from 'notistack'
import { act, fireEvent, render } from '@testing-library/react'

import { Send, componentId, SendProps } from './Send'

import { _testWalletsEth, testIdBuilder } from 'shared/helpers/test'
var isAddressValid = true
var isAddressPrivate = true
const test = testIdBuilder(componentId)
const useSnackbarMock = useSnackbar as jest.Mock
const outputSpy = jest.fn()

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: jest.fn(),
}))

jest.mock('wallet/api/zeropool.api', () => ({
  isPrivateAddress: jest.fn(() => isAddressPrivate),
}))

jest.mock('shared/helpers/addres.helper', () => ({
  validateAddress: jest.fn(() => {
    debugger
    return isAddressValid
  }),
}))

describe('Send', () => {
  let component: React.ReactElement<SendProps>

  beforeEach(() => {
    // isAddressPrivate = false
    // isAddressValid = false

    useSnackbarMock.mockImplementation(() => ({
      enqueueSnackbar: jest.fn(),
    }))

    component = <Send rate={123} wallet={_testWalletsEth[0]} onNextClick={outputSpy} />
  })

  it('renders component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })

  it('calls onNextClick() prop when Next button clicked', async () => {
    let call: any
    const { getByTestId } = render(component)
    const addressInput = getByTestId(test('AddressInput')) as HTMLInputElement
    const amountInput = getByTestId(test('AmountInput')) as HTMLInputElement
    const nextButton = getByTestId(test('NextButton')) as HTMLButtonElement

    await act(async () => {
      await fireEvent.input(addressInput, {
        target: { value: 'test-address' },
      })
      await fireEvent.input(amountInput, {
        target: { value: '1' },
      })
      await fireEvent.click(nextButton)
    })
  
    call = outputSpy.mock.calls[0]

    expect(outputSpy).toHaveBeenCalledTimes(1)
  })

  it('shows private logo when address is private', async () => {
    // const { getByTestId } = render(component)

  })
})
