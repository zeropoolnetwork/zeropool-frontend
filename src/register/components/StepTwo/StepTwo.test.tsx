import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { useSnackbar } from 'notistack'

import { componentId, StepTwo, StepTwoProps } from './StepTwo'

const useSnackbarMock = useSnackbar as jest.Mock

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: jest.fn(),
}))

describe('StepTwo', () => {
  let component: React.ReactElement<StepTwoProps>
  let onBackSpy: jest.Mock
  let onSubmitSpy: jest.Mock

  beforeEach(() => {
    onSubmitSpy = jest.fn()
    onBackSpy = jest.fn()
    component = <StepTwo seed={['1', '2', '3']} onSubmit={onSubmitSpy} onBack={onBackSpy} />
    useSnackbarMock.mockImplementation(() => ({ enqueueSnackbar: jest.fn() }))
  })

  it('renders submit button', () => {
    const { getByTestId } = render(<StepTwo onSubmit={() => true} onBack={onBackSpy} seed={['test']} />)

    expect(getByTestId(`${componentId}-Submit`)).toBeInTheDocument()
  })

  describe('Back button', () => {
    it('shows back button', () => {
      const { getByTestId } = render(component)

      expect(getByTestId(`${componentId}-Back`)).toBeInTheDocument()
    })

    it('should call onBack prop callback when clicked', () => {
      const { getByTestId } = render(component)
      fireEvent.click(getByTestId(`${componentId}-Back`))

      expect(onBackSpy).toHaveBeenCalledTimes(1)
    })
  })
})
