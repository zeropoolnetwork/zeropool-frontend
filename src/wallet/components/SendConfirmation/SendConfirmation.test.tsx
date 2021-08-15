import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import { SendConfirmation, componentId, SendConfirmationProps } from './SendConfirmation'

import { _testWalletsEth } from 'shared/helpers/test/app-state.helper'

describe('SendConfirmation', () => {
  let outputSpy: jest.Mock = jest.fn()
  let component: React.ReactElement<SendConfirmationProps>

  beforeEach(() => {
    outputSpy = jest.fn()
    component = (
      <SendConfirmation
        amount={123}
        address={'0x123'}
        rate={123}
        fee={'123'}
        wallet={_testWalletsEth[0]}
        onConfirmClick={outputSpy}
      />
    )
  })

  it('renders component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })

  it('calls onConfirmClick() prop when Confirm button clicked', () => {
    const { getByTestId } = render(component)
    fireEvent.click(getByTestId(componentId + '-Confirm'))

    expect(outputSpy).toHaveBeenCalledTimes(1)
  })
})
