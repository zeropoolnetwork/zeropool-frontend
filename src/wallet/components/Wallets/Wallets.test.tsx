import React from 'react'
import { render } from '@testing-library/react'

import { Wallets, componentId, WalletsProps } from './Wallets'

import { _testToken } from 'shared/helpers/test/app-state.helper'

describe('Wallets', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<WalletsProps>

  beforeEach(() => {
    outputSpy = jest.fn()
    component = (
      <Wallets
        rate={111}
        token={_testToken}
        wallets={[]}
        handlers={{
          onAdd: jest.fn(),
          onRename: jest.fn(),
          onDelete: jest.fn(),
          onReceive: jest.fn(),
          onSend: jest.fn(),
          onOpen: jest.fn(),
        }}
      />
    )
  })

  it('should render component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })
})
