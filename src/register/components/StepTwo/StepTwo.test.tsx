import React from 'react'
import { render } from '@testing-library/react'
import { useSnackbar } from 'notistack'


import { componentId, StepTwo } from './StepTwo'

const useSnackbarMock = useSnackbar as jest.Mock


jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: jest.fn(),
}))

describe('StepTwo', () => {
  it('renders submit button', () => {
    useSnackbarMock.mockImplementation(() => ({ enqueueSnackbar: jest.fn() }))

    const { getByTestId } = render(<StepTwo onSubmit={() => true} seed={['test']} />)

    expect(getByTestId(`${componentId}-SubmitButton`)).toBeInTheDocument()
  })
})
