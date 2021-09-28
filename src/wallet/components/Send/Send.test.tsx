import React from 'react'
import { useSnackbar } from 'notistack'
import { act, fireEvent, render } from '@testing-library/react'

import { Send, componentId, SendProps } from './Send'

import { _testWalletsEth, testIdBuilder } from 'shared/helpers/test'

const test = testIdBuilder(componentId)
const useSnackbarMock = useSnackbar as jest.Mock
const outputSpy = jest.fn()

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: jest.fn(),
}))

describe('Send', () => {
  let component: React.ReactElement<SendProps>

  beforeEach(() => {
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
})
