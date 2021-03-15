import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { WalletHeader, componentId, WalletHeaderProps } from './WalletHeader'

import { WalletHeaderMode } from './WalletHeaderMode'

describe('WalletHeader', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<WalletHeaderProps>
  afterEach(cleanup)

  beforeEach(() => {
    outputSpy = jest.fn()
    component = (
      <WalletHeader
        label={'test label'}
        mode={WalletHeaderMode.Info}
        tokenAmount={5}
        tokenRate={750}
        tokenSymbol={'ETH'}
        fiatValue={3250.43}
        onBackClick={jest.fn()}
      />
    )
  })

  it('should render component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })
})
