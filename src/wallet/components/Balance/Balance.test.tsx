import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { Balance, componentId, BalanceProps } from './Balance'

describe('Balance', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<BalanceProps>
  afterEach(cleanup)

  jest.mock('wallet/components/TokenRow/TokenRow', () => () => <span>TokenRow</span>)

  beforeEach(() => {
    outputSpy = jest.fn()
    component = (
      <Balance
        amounts={{ NEAR: 2 }}
        rates={{ NEAR: 1 }}
        tokens={['NEAR']}
        tokensRecord={{ NEAR: { id: 1, name: 'test', symbol: 'TST' } }}
      />
    )
  })

  it('should render component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })
})
