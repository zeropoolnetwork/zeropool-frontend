import React from 'react'
import sinon from 'sinon'
import { fireEvent, render } from '@testing-library/react'

import { componentId, StepThree, StepThreeProps } from './StepThree'

jest.mock('register/components/SeedPanel/SeedPanel', () => (<div />))

describe('StepThree', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<StepThreeProps>
  let onBackSpy: jest.Mock

  beforeEach(() => {
    outputSpy = jest.fn()
    onBackSpy = jest.fn()
    component = <StepThree onConfirm={outputSpy} onBack={onBackSpy} seed={['test']} />
  })

  it('should render component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })

  describe('Confirm button', () => {
    beforeAll(() => {
      // sinon
    })

    it('should render', () => {
      const { getByTestId } = render(component)

      expect(getByTestId(`${componentId}-Confirm`)).toBeInTheDocument()
    })

    it('should call onConfirm prop callback when clicked', () => {
      const { getByTestId } = render(component)
      const seedPanel = getByTestId(`${componentId}-SeedPanel`)

      fireEvent.click(getByTestId(`${componentId}-Confirm`))

      expect(seedPanel).toBeDefined()
      expect(outputSpy).toHaveBeenCalledTimes(1); // need to enable button first
    })
  })

  describe('Back button', () => {
    it('shows back button', () => {
      const { getByTestId } = render(component)

      expect(getByTestId(`${componentId}-Back`)).toBeInTheDocument()
    })

    it('should call onBack prop callback when clicked', () => {
      const { getByTestId } = render(component)
      fireEvent.click(getByTestId(`${componentId}-Back`))

      expect(onBackSpy).toHaveBeenCalledTimes(1)
    })
  })
})
