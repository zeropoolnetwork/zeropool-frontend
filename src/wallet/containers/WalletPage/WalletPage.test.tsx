import React from 'react'
import { useSnackbar } from 'notistack'
import { render } from '@testing-library/react'
import { useSelector, useDispatch } from 'react-redux'

import { componentId, WalletPage } from './WalletPage'

import { mockAppState } from 'shared/helpers/test/app-state.helper'
import { BrowserRouter } from 'react-router-dom'
//#region Mocks
const useSnackbarMock = useSnackbar as jest.Mock
const useSelectorMock = useSelector as jest.Mock
const useDispatchMock = useDispatch as jest.Mock
const dispatchSpy = jest.fn()

jest.mock('wallet/api/zeropool.api', () => ({
  isPrivateAddress: jest.fn(),
}))

jest.mock('shared/helpers/addres.helper', () => {
  return {
    beautifyAmount: jest.fn(),
    beautifyAddress: jest.fn(),
  }
})

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: jest.fn(),
}))
//#endregion
describe('WalletPage', () => {
  beforeEach(() => {
    useSelectorMock.mockImplementation((selectorFn) => selectorFn(mockAppState))
    useDispatchMock.mockReturnValue(dispatchSpy)
    useSnackbarMock.mockImplementation(() => ({
      enqueueSnackbar: jest.fn(),
    }))
  })

  it('WalletPage', () => {
    const { getByTestId } = render(<BrowserRouter><WalletPage /></BrowserRouter>)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })
})
