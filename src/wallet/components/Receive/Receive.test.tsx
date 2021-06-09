import { useSnackbar } from 'notistack'
import { render } from '@testing-library/react'

import { Receive, componentId } from './Receive'

import { _testToken } from 'shared/helpers/test/app-state.helper'
//#region Mocks
const useSnackbarMock = useSnackbar as jest.Mock

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: jest.fn(),
}))
//#endregion
describe('Receive view', () => {
  const componentFactory = (address = '0x123asd', token = _testToken) => (
    <Receive address={address} token={token} />
  )

  beforeEach(() => {
    useSnackbarMock.mockImplementation(() => ({
      enqueueSnackbar: jest.fn(),
    }))
  })

  it('renders component', () => {
    const { getByTestId } = render(componentFactory())

    expect(getByTestId(componentId)).toBeInTheDocument()
  })

  it('shows "Receive <currency>" title', () => {
    const { getByText } = render(componentFactory('', { ..._testToken, name: 'ETH' }))

    expect(getByText('Receive ETH')).toBeInTheDocument()
  })
})
