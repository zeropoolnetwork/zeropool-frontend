import React from 'react'
import notistack from 'notistack'
import { render } from '@testing-library/react'

import { Transactions, componentId, TransactionsProps } from './Transactions'

import { _testWalletsEth } from 'shared/helpers/test/app-state.helper'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

jest.mock('notistack', () => ({
  useSnackbar: jest.fn(),
}))
// @ts-ignore
jest.spyOn(notistack, 'useSnackbar').mockImplementation(() => {
  return { enqueueSnackbar: jest.fn() }
})

describe('Transactions', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<TransactionsProps>

  beforeEach(() => {
    outputSpy = jest.fn()
    component = <Transactions wallet={_testWalletsEth[0]} />
  })

  it('should render component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })
})
