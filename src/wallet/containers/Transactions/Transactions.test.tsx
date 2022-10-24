import React from 'react'
import { useSnackbar } from 'notistack'
import { render } from '@testing-library/react'

import { Transactions, componentId, TransactionsProps } from './Transactions'

import { _testWalletsEth } from 'shared/helpers/test/app-state.helper'
//#region Mocks
const useSnackbarMock = useSnackbar as jest.Mock

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
describe('Transactions', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<TransactionsProps>

  beforeEach(() => {
    outputSpy = jest.fn()
    useSnackbarMock.mockImplementation(() => ({
      enqueueSnackbar: jest.fn(),
    }))
    component = <Transactions transactions={[]} address={''} onClose={() => { }} />
  })

  it('should render component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })
})
