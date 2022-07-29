import React from 'react'
import { render } from '@testing-library/react'

import { Token } from 'shared/models/token'

import { TokenRow, componentId, TokenRowProps } from './TokenRow'

jest.mock('shared/components/Icon/Icon')
jest.mock('shared/components/Icon/IconOption')
jest.mock('shared/helpers/addres.helper', () => {
  return {
    beautifyAmount: jest.fn(),
  }
})

describe('TokenRow', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<TokenRowProps>

  const token: Token = { name: 'Test', id: 1, symbol: 'TST' }

  beforeEach(() => {
    outputSpy = jest.fn()
    component = <TokenRow amount={1} token={token} rate={500} onSelectToken={jest.fn()} />
  })

  it('should render component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })
})
