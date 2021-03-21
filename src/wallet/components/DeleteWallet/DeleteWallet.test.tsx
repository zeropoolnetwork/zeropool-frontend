import React from 'react'
import { render } from '@testing-library/react'

import { DeleteWallet, componentId, DeleteWalletProps } from './DeleteWallet'

describe('DeleteWallet', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<DeleteWalletProps>

  beforeEach(() => {
    outputSpy = jest.fn()
    component = <DeleteWallet walletName={'test'} onCancel={jest.fn()} onDelete={jest.fn()} />
  })

  it('should render component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })
})
