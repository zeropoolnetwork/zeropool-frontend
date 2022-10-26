import React from 'react'
import { useSnackbar } from 'notistack'
import { act, fireEvent, render } from '@testing-library/react'

import { Send, componentId, SendProps } from './Send'

import { _testWalletsEth, testIdBuilder } from 'shared/helpers/test'
import { validateAddress } from 'shared/helpers/address.helper'
import { addressShielded } from 'wallet/api/zeropool.api'

let addressValid: boolean
let addressPrivate: boolean

const test = testIdBuilder(componentId)
const isPrivateAddressMock = addressShielded as jest.Mock
const useSnackbarMock = useSnackbar as jest.Mock
const validateAddressMock = validateAddress as jest.Mock
const outputSpy = jest.fn()

jest.mock('assets/images/logo_black.png')

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: jest.fn(),
}))

jest.mock('wallet/api/zeropool.api', () => ({
  addressShielded: jest.fn(),
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
        await fireEvent.input(addressInput, { target: { value: '123' } })
      })

      expect(addressInput.value).toBe('123')
      expect(queryByTestId('Send-Logo')).toBeInTheDocument()
    })

    it('do not shows private logo when address is non-private', async () => {
      const renderResult = render(component)
      const addressInput: HTMLInputElement = renderResult.getByTestId(
        'Send-AddressInput',
      ) as HTMLInputElement

      await act(async () => {
        await fireEvent.input(addressInput, { target: { value: 'gogogo' } })
      })

      expect(addressInput.value).toBe('gogogo')
      expect(renderResult.queryByTestId('Send-Logo')).toBe(null)
    })

    it('do not shows private logo when adress feld is empty', () => {
      const { queryByTestId } = render(component)

      expect(queryByTestId('Send-Logo')).toBe(null)
    })
  })

  describe('Validate', () => {
    describe('Inputs', () => {
      it('amount input valid on proper data', async () => {
        const { getByTestId } = render(component)
        const invalidClass = 'Send-AmountInput_Invalid'
        const amountInput = getByTestId('Send-AmountInput') as HTMLInputElement
        const amountInputRoot = getByTestId('Send-AmountInputRoot') as HTMLElement

        await act(async () => {
          await fireEvent.input(amountInput, { target: { value: '123' } })
        })

        expect(amountInputRoot.classList).not.toContain(invalidClass)
      })

      it('amount input invalid on wrong data', async () => {
        const { getByTestId } = render(component)
        const invalidClass = 'Send-AmountInput_Invalid'
        const amountInput = getByTestId('Send-AmountInput') as HTMLInputElement
        const amountInputRoot = getByTestId('Send-AmountInputRoot') as HTMLElement

        await act(async () => {
          await fireEvent.input(amountInput, { target: { value: '123s' } })
        })

        expect(amountInputRoot.classList).toContain(invalidClass)
      })

      it('address input valid on proper data', async () => {
        const { getByTestId } = render(component)
        const invalidClass = 'Send-AddressInput_Invalid'
        const addressInput = getByTestId('Send-AddressInput') as HTMLInputElement
        const addressInputRoot = getByTestId('Send-AddressInputRoot') as HTMLElement

        addressValid = true

        await act(async () => {
          await fireEvent.input(addressInput, { target: { value: '123' } })
        })

        expect(addressInputRoot.classList).not.toContain(invalidClass)
      })

      it('address input invalid on wrong data', async () => {
        const { getByTestId } = render(component)
        const invalidClass = 'Send-AddressInput_Invalid'
        const addressInput = getByTestId('Send-AddressInput') as HTMLInputElement
        const addressInputRoot = getByTestId('Send-AddressInputRoot') as HTMLElement

        await act(async () => {
          await fireEvent.input(addressInput, { target: { value: '123' } })
        })

        expect(addressInputRoot.classList).toContain(invalidClass)
      })
    })

    describe('Button', () => {
      it('button disabled if inputs are empty', async () => {
        const { getByTestId } = render(component)
        const addressInput = getByTestId('Send-AddressInput') as HTMLInputElement
        const amountInput = getByTestId('Send-AmountInput') as HTMLInputElement

        await act(async () => {
          await fireEvent.input(addressInput, { target: { value: '' } })
          await fireEvent.input(amountInput, { target: { value: '' } })
        })

        expect(getByTestId('Send-NextButton')).toHaveProperty('disabled')
      })

      it('button disabled if first input empty', async () => {
        const { getByTestId } = render(component)
        const addressInput = getByTestId('Send-AddressInput') as HTMLInputElement
        const amountInput = getByTestId('Send-AmountInput') as HTMLInputElement

        await act(async () => {
          await fireEvent.input(addressInput, { target: { value: '' } })
          await fireEvent.input(amountInput, { target: { value: '123' } })
        })

        expect(getByTestId('Send-NextButton')).toHaveProperty('disabled')
      })

      it('button disabled second input empty', async () => {
        const { getByTestId } = render(component)
        const addressInput = getByTestId('Send-AddressInput') as HTMLInputElement
        const amountInput = getByTestId('Send-AmountInput') as HTMLInputElement

        addressValid = true

        await act(async () => {
          await fireEvent.input(addressInput, { target: { value: '123' } })
          await fireEvent.input(amountInput, { target: { value: '' } })
        })

        expect(getByTestId('Send-NextButton')).toHaveProperty('disabled')
      })

      it('button enabled if all inputs are valid', async () => {
        const { getByTestId } = render(component)
        const addressInput = getByTestId('Send-AddressInput') as HTMLInputElement
        const amountInput = getByTestId('Send-AmountInput') as HTMLInputElement

        addressValid = true

        await act(async () => {
          await fireEvent.input(addressInput, { target: { value: '123' } })
          await fireEvent.input(amountInput, { target: { value: '123' } })
        })

        expect(getByTestId('Send-NextButton')).not.toBeDisabled()
      })
    })
  })
})
