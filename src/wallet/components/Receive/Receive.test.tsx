import { useSnackbar } from 'notistack'
import { fireEvent, render } from '@testing-library/react'

import { Receive, componentId, ReceiveProps } from './Receive'

import { testIdBuilder, _testToken } from 'shared/helpers/test'

const testId = testIdBuilder(componentId)

//#region Mocks
const useSnackbarMock = useSnackbar as jest.Mock
const getPrivateAddressSpy = jest.fn()
const snackbarSpy = jest.fn()
const clipboardSpy = jest.fn()

jest.mock('notistack', () => ({
  useSnackbar: jest.fn(),
}))
//#endregion
describe('Receive view', () => {
  const factory = ({
    address = '123',
    token = _testToken,
    getPrivateAddress = getPrivateAddressSpy,
    privateAddress = null,
  }: Partial<ReceiveProps>) => (
    <Receive
      address={address}
      token={token}
      privateAddress={privateAddress}
      getPrivateAddress={getPrivateAddress}
    />
  )

  beforeEach(() => {
    useSnackbarMock.mockImplementation(() => ({
      enqueueSnackbar: snackbarSpy,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders component', () => {
    const { getByTestId } = render(factory({}))

    expect(getByTestId(componentId)).toBeInTheDocument()
  })

  it('shows "Receive <currency>" title', () => {
    const { getByText } = render(factory({ token: { ..._testToken, name: 'ETH' } }))

    expect(getByText('Receive ETH')).toBeInTheDocument()
  })

  it('shows qr-code if it has an address', () => {
    const { getByTestId, queryByTestId } = render(factory({}))

    expect(getByTestId(testId('Code'))).toBeInTheDocument()
    expect(queryByTestId(testId('Button'))).toBeNull()
  })

  it('shows qr-code if has private address', () => {
    const { getByTestId, queryByTestId } = render(factory({ address: '', privateAddress: '123' }))

    expect(getByTestId(testId('Code'))).toBeInTheDocument()
    expect(queryByTestId(testId('Button'))).toBeNull()
  })

  it('shows GENERATE buttun if has no normal or private adress', () => {
    const { getByTestId, queryByTestId } = render(factory({ address: '', privateAddress: null }))

    expect(getByTestId(testId('Button'))).toBeInTheDocument()
    expect(queryByTestId(testId('Code'))).toBeNull()
  })

  it('shows qr-code after click on GENERATE buttun, that hiding after that', async () => {
    const { getByTestId, queryByTestId, rerender } = render(factory({ address: '' }))

    getByTestId(testId('Button')).click()

    await fireEvent.click(getByTestId(testId('Button')))

    rerender(factory({ privateAddress: '123', address: '' }))

    expect(getPrivateAddressSpy).toHaveBeenCalled()
    expect(getByTestId(testId('Code'))).toBeInTheDocument()
    expect(queryByTestId(testId('Button'))).toBeNull()
  })

  it('copy address to clipboard when clicking on qr-code', async () => {
    const { getByTestId } = render(factory({}))

    clipboardSpy.mockResolvedValueOnce(true)

    Object.assign(navigator, {
      clipboard: {
        writeText: clipboardSpy,
      },
    })

    await fireEvent.click(getByTestId(testId('Code')))

    expect(clipboardSpy).toHaveBeenCalled()
  })

  it('shows snackbar with info when clicking on qr-code', async () => {
    const { getByTestId } = render(factory({}))

    clipboardSpy.mockResolvedValueOnce(true)

    Object.assign(navigator, {
      clipboard: {
        writeText: clipboardSpy,
      },
    })

    await fireEvent.click(getByTestId(testId('Code')))

    const callParams = snackbarSpy.mock.calls[0][1]

    expect(snackbarSpy).toHaveBeenCalled()
    expect(callParams.variant).toBe('success')
  })

  it('shows snackbar with warning when can not access clipboard', async () => {
    const { getByTestId } = render(factory({}))

    clipboardSpy.mockRejectedValueOnce(true)

    Object.assign(navigator, {
      clipboard: {
        writeText: clipboardSpy,
      },
    })

    await fireEvent.click(getByTestId(testId('Code')))

    const callParams = snackbarSpy.mock.calls[0][1]

    expect(snackbarSpy).toHaveBeenCalled()
    expect(callParams.variant).toBe('error')
  })
})
