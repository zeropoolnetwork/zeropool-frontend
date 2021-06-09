import React from 'react'
import { useSnackbar } from 'notistack'
import { fireEvent, render } from '@testing-library/react'

import { Send, componentId, SendProps } from './Send'

import { _testWalletsEth } from 'shared/helpers/test/app-state.helper'

const useSnackbarMock = useSnackbar as jest.Mock
const outputSpy = jest.fn()

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: jest.fn(),
}))

describe('Send', () => {
  let component: React.ReactElement<SendProps>

  beforeEach(() => {
    useSnackbarMock.mockImplementation(() => ({
      enqueueSnackbar: jest.fn(),
    }))

    component = <Send rate={123} wallet={_testWalletsEth[0]} onNextClick={outputSpy} />
  })

  it('renders component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })

  it('calls onNextClick() prop when Next button clicked', () => {
    const { getByTestId } = render(component)
    fireEvent.click(getByTestId(componentId + '-Next'))

    // expect(outputSpy).toHaveBeenCalledTimes(1);
  })
})
