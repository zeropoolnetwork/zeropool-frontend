import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { HelpPage, componentId, HelpPageProps } from './HelpPage'

describe('HelpPage', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<HelpPageProps>
  afterEach(cleanup)

  beforeEach(() => {
    outputSpy = jest.fn()
    component = <HelpPage />
  })

  it('should render component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })
})
