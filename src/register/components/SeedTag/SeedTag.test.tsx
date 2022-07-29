import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import { SeedTag, componentId, SeedTagProps } from './SeedTag'

jest.mock('shared/utils/shuffle')

describe('SeedTag', () => {
  let outputSpy: jest.Mock
  let spyCall
  let component: React.ReactElement<SeedTagProps>

  beforeEach(() => {
    outputSpy = jest.fn()
    component = <SeedTag text={'testText'} num={1} />
  })

  it('renders', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId)).toBeInTheDocument()
  })

  it('displays text', () => {
    const { getByTestId } = render(component)

    expect(getByTestId(componentId).textContent?.includes('testText')).toBeTruthy()
  })

  it('displays number if passed', () => {
    const { getByTestId } = render(<SeedTag text={'test123'} num={333} />)

    expect(getByTestId(componentId).textContent?.includes('334')).toBeTruthy()
  })

  it('displays as placeholder if `hidden` flag passed', () => {
    const { getByTestId } = render(<SeedTag text={'testText'} num={32341} hidden={true} />)

    expect(getByTestId(componentId).textContent?.includes('32342')).toBeFalsy()
    expect(getByTestId(componentId).textContent?.includes('testText')).toBeFalsy()
    expect(getByTestId(componentId).className.includes('Placeholder')).toBeTruthy()
  })

  it('calls onClick() if it passed in', () => {
    const { getByTestId } = render(<SeedTag text={'test'} num={1} onClick={outputSpy} />)
    fireEvent.click(getByTestId(componentId))

    expect(outputSpy).toHaveBeenCalledTimes(1)
  })

  it('calls onClick() with number if both passed in', () => {
    const cmp = <SeedTag text={'test'} onClick={outputSpy} num={333} />
    const { getByTestId } = render(cmp)

    fireEvent.click(getByTestId(componentId))

    spyCall = outputSpy.mock.calls[0]

    expect(spyCall[0]).toBe(333)
  })
})
