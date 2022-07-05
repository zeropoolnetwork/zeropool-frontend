import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import { componentId, StepOne, StepOneProps } from './StepOne'

describe('StepOne', () => {
  let component: React.ReactElement<StepOneProps>
  let onSubmitSpy: jest.Mock
  let onBackSpy: jest.Mock

  beforeEach(() => {
    onSubmitSpy = jest.fn()
    onBackSpy = jest.fn()
    component = <StepOne onGenerate={onSubmitSpy} onBack={onBackSpy} />
  })

  it('should render component', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })

  describe('Generate button', () => {
    it('shows generate button', () => {
      const { getByTestId } = render(component)

      expect(getByTestId(`${componentId}-Generate`)).toBeInTheDocument()
    })

    it('should call onGenerate prop callback when clicked', () => {
      const { getByTestId } = render(component)
      fireEvent.click(getByTestId(`${componentId}-Generate`))

      expect(onSubmitSpy).toHaveBeenCalledTimes(1)
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
