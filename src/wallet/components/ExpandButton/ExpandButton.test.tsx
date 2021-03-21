import React from 'react'
import { render } from '@testing-library/react'

import { ExpandButton, componentId, ExpendButtonProps } from './ExpandButton'

describe('ExpandButton', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<ExpendButtonProps>

  beforeEach(() => {
    outputSpy = jest.fn()
    component = <ExpandButton click={jest.fn} expanded={false} />
  })

  it('should render component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })
})
