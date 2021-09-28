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
    <Receive address={address} token={token} privateAddress="test" getPrivateAddress={() => true} />
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

  it('shows qr-code if has address', () => {
    const renderResult = render(
      <Receive
        address={'123'}
        token={_testToken}
        privateAddress="test"
        getPrivateAddress={() => true}
      />,
    )

    expect(renderResult.getByTestId(componentId + '-Code')).toBeInTheDocument()
    expect(renderResult.queryByTestId(componentId + '-Button')).toBeNull()
  })

  it('shows qr-code if has private address', () => {
    const renderResult = render(
      <Receive
        address={''}
        token={_testToken}
        privateAddress={'123'}
        getPrivateAddress={() => true}
      />,
    )

    expect(renderResult.getByTestId(componentId + '-Code')).toBeInTheDocument()
    expect(renderResult.queryByTestId(componentId + '-Button')).toBeNull()
  })

  it('shows GENERATE buttun if has no normal or private adress', () => {
    const renderResult = render(
      <Receive
        address={''}
        token={_testToken}
        privateAddress={''}
        getPrivateAddress={() => true}
      />,
    )

    expect(renderResult.getByTestId(componentId + '-Button')).toBeInTheDocument()
    expect(renderResult.queryByTestId(componentId + '-Code')).toBeNull()
  })
})

