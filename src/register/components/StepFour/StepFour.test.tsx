import React, { ReactElement } from 'react'
import { queryByAttribute, act } from '@testing-library/react'

import { StepFour, componentId, StepFourProps } from './StepFour'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { createClientRender, fireEvent } from 'shared/util/render.js'

const test = testIdBuilder(componentId)
const getById = queryByAttribute.bind(null, 'id')

describe('StepFour', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<StepFourProps>
  const render = createClientRender({ strict: false })

  beforeEach(() => {
    outputSpy = jest.fn()
    component = <StepFour onRegister={outputSpy} />
  })

  const setup = (cmp: ReactElement) => {
    const utils = render(cmp)
    const root = utils.getByTestId(test())
    const password = getById(utils.container, test('Password'))
    const confirm = getById(utils.container, test('Confirm'))
    const submit = utils.getByTestId(test('Submit'))

    return { root, password, confirm, submit, ...utils, utils }
  }

  it('renders component', () => {
    const { getByTestId } = setup(component)

    expect(getByTestId(test())).toBeInTheDocument()
  })

  it('not calls onRegister if input form is invalid', () => {
    const { submit } = setup(component)
    let call: any

    fireEvent.click(submit)

    call = outputSpy.mock.calls[0] // "calls[0] is undefined" means no call was fired

    expect(outputSpy).toHaveBeenCalledTimes(0)
    expect(call).toBeUndefined()
  })

  // TODO: Fix needed
  // Warning: When testing, code that causes React state updates should be wrapped into act(...)
  it('calls onRegister with password if input form is valid', async () => {
    let call: any
    const { getByTestId } = render(component)

    await act(async () => {
      await fireEvent.input(getByTestId(test('Password')), { target: { value: '1234qwer' } })
      await fireEvent.input(getByTestId(test('Confirm')), { target: { value: '1234qwer' } })
      await fireEvent.click(getByTestId(test('Submit')))
    })

    call = outputSpy.mock.calls[0][0]

    expect(outputSpy).toHaveBeenCalledTimes(1)
    expect(call.password).toBe('1234qwer')
  })
})
