import React, { ReactElement } from 'react'
import { fireEvent, queryByText, render } from '@testing-library/react'

import { componentId, StepHeader, StepHeaderProps } from './StepHeader'

describe('StepHeader', () => {
  let outputSpy = jest.fn()
  let component: ReactElement<StepHeaderProps>

  beforeEach(() => {
    outputSpy = jest.fn()
    component = <StepHeader step={2} total={3} onBack={outputSpy} />
  })

  it('renders', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })

  it('shows current step', () => {
    const { container } = render(component)

    expect(container.getElementsByClassName(`${componentId}-Perl_Active`).length).toBe(1)
  })

  it('shows steps', () => {
    const { container, getByText } = render(component)

    expect(container.getElementsByClassName(`${componentId}-Perl`).length).toBe(4)
    expect(getByText('4')).toBeInTheDocument()
    expect(queryByText(container, '5')).not.toBeInTheDocument()
  })

  describe('Back button', () => {
    it('renders', () => {
      const { getByTestId } = render(component)

      expect(getByTestId(`${componentId}-BackButton`)).toBeInTheDocument()
    })

    it('calls onBack() prop when ckicked', () => {
      const { getByTestId } = render(component)
      fireEvent.click(getByTestId(`${componentId}-BackButton`))

      expect(outputSpy).toHaveBeenCalledTimes(1)
    })
  })
})
