import React from 'react'
import { useSnackbar } from 'notistack'
import { act, fireEvent, render } from '@testing-library/react'

import { Send, componentId, SendProps } from './Send'

import { _testWalletsEth, testIdBuilder } from 'shared/helpers/test'
import { validateAddress } from 'shared/helpers/addres.helper'
import { isPrivateAddress } from 'wallet/api/zeropool.api'

let addressValid: boolean
let addressPrivate: boolean

const test = testIdBuilder(componentId)
const isPrivateAddressMock = isPrivateAddress as jest.Mock
const useSnackbarMock = useSnackbar as jest.Mock
const validateAddressMock = validateAddress as jest.Mock
const outputSpy = jest.fn()

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: jest.fn(),
}))

jest.mock('wallet/api/zeropool.api', () => ({
  isPrivateAddress: jest.fn(),
}))

jest.mock('shared/helpers/addres.helper', () => ({
  validateAddress: jest.fn(),
}))

describe('Send', () => {
  let component: React.ReactElement<SendProps>

  beforeEach(() => {
    addressValid = false
    addressPrivate = false

    isPrivateAddressMock.mockImplementation(() => addressPrivate)
    validateAddressMock.mockImplementation(() => addressValid)
    useSnackbarMock.mockImplementation(() => ({ enqueueSnackbar: jest.fn() }))

    component = <Send rate={123} wallet={_testWalletsEth[0]} onNextClick={outputSpy} />
  })

  it('renders component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })

  it('calls onNextClick() prop when Next button clicked', async () => {
    const { getByTestId } = render(component)
    const addressInput = getByTestId(test('AddressInput'))
    const amountInput = getByTestId(test('AmountInput')) as HTMLInputElement
    const nextButton = getByTestId(test('NextButton'))

    addressValid = true

    await act(async () => {
      await fireEvent.input(addressInput, { target: { value: 'test' } })
      await fireEvent.input(amountInput, { target: { value: '1.1' } })
      await fireEvent.click(nextButton)
    })

    expect(outputSpy).toHaveBeenCalledTimes(1)
  })

  describe('Private logo', () => {
    it('shows private logo when address is private', async () => {
      const { getByTestId, queryByTestId } = render(component)
      const addressInput = getByTestId('Send-AddressInput') as HTMLInputElement

      addressPrivate = true

      await act(async () => {
        await fireEvent.input(addressInput, { target: {value: '123'}})
      })

      expect(addressInput.value).toBe('123')
      expect(queryByTestId('Send-Logo')).toBeInTheDocument()
    })
    
    it('do not shows private logo when address is non-private', async () => {
      const renderResult = render(component)
      const addressInput: HTMLInputElement = renderResult.getByTestId('Send-AddressInput') as HTMLInputElement
      
      await act(async () => {
        await fireEvent.input(addressInput, { target: {value: 'gogogo'}})
      })
      
      expect(addressInput.value).toBe('gogogo')
      expect(renderResult.queryByTestId('Send-Logo')).toBe(null)
    })

    it('do not shows private logo when adress feld is empty', () => {
      const { queryByTestId } = render(component)

      expect(queryByTestId('Send-Logo')).toBe(null)
    });
  });
})
