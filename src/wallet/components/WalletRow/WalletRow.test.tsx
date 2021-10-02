import React from 'react'
import { render } from '@testing-library/react'

import { WalletRow, componentId, WalletRowProps } from './WalletRow'

import { _testToken, _testWalletsEth } from 'shared/helpers/test/app-state.helper'

jest.mock('shared/helpers/addres.helper', () => {
  return {
    beautifyAmount: jest.fn(),
  }
})

describe('WalletRow', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<WalletRowProps>

  beforeEach(() => {
    outputSpy = jest.fn()
    component = (
      <WalletRow
        rate={1}
        rollUp={0}
        token={_testToken}
        wallet={_testWalletsEth[0]}
        onEditClick={jest.fn()}
        onReceiveClick={jest.fn()}
        onSendClick={jest.fn()}
        onRollUpClick={jest.fn()}
        onWalletNameClick={jest.fn()}
      />
    )
  })

  it('should render component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })
})
