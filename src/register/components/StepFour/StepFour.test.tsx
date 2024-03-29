import { cn } from '@bem-react/classname'
import React, { ReactElement } from 'react'
import { queryByAttribute, act } from '@testing-library/react'

import { StepFour, componentId, StepFourProps } from './StepFour'

import { createClientRender, fireEvent } from 'shared/utils/render.js'

const bem = cn(componentId)
const getById = queryByAttribute.bind(null, 'id')

describe('StepFour', () => {
  let onSubmitSpy: jest.Mock
  let onBackSpy: jest.Mock
  let component: React.ReactElement<StepFourProps>
  const render = createClientRender({ strict: false })

  beforeEach(() => {
    onSubmitSpy = jest.fn()
    onBackSpy = jest.fn()
    component = <StepFour onRegister={onSubmitSpy} onBack={onBackSpy} />
  })

  const setup = (cmp: ReactElement) => {
    const utils = render(cmp)
    const root = utils.getByTestId(bem())
    const password = getById(utils.container, bem('Password'))
    const confirm = getById(utils.container, bem('Confirm'))
    const submit = utils.getByTestId(bem('Submit'))

    return { root, password, confirm, submit, ...utils, utils }
  }

  it('renders component', () => {
    const { getByTestId } = setup(component)

    expect(getByTestId(bem())).toBeInTheDocument()
  })

  it('not calls onRegister if input form is invalid', async () => {
    const { submit } = setup(component)
    let call: any

    await act(async () => {
      await fireEvent.click(submit)
    })

    call = onSubmitSpy.mock.calls[0] // "calls[0] is undefined" means no call was fired

    expect(onSubmitSpy).toHaveBeenCalledTimes(0)
    expect(call).toBeUndefined()
  })

  it('calls onRegister with password if input form is valid', async () => {
    let call: any
    const { getByTestId } = render(component)

    await act(async () => {
      await fireEvent.input(getByTestId(bem('Password')), {
        target: { value: '1234qwer' },
      })
      await fireEvent.input(getByTestId(bem('Confirm')), {
        target: { value: '1234qwer' },
      })
      await fireEvent.click(getByTestId(bem('Submit')))
    })

    call = onSubmitSpy.mock.calls[0][0]

    expect(onSubmitSpy).toHaveBeenCalledTimes(1)
    expect(call.password).toBe('1234qwer')
  })

  it('calls onBack when back button is clicked', async () => {
    const { getByTestId } = render(component)

    await act(async () => {
      await fireEvent.click(getByTestId(bem('Back')))
    })

    expect(onBackSpy).toHaveBeenCalledTimes(1)
  })
})
