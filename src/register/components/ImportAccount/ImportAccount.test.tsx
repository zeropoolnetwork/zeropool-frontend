import { cn } from '@bem-react/classname'
import { useSnackbar } from 'notistack'
import React, { ReactElement } from 'react'

import { componentId, ImportAccount, ImportAccountProps } from './ImportAccount'

import { createClientRender, queryByAttribute } from 'shared/utils/render.js'

const bem = cn(componentId)
const getById = queryByAttribute.bind(null, 'id')

jest.mock('notistack', () => ({useSnackbar: jest.fn()}))
jest.mock('register/state/helpers/seed.helper', () => ({
  validateSeed: jest.fn(),
}))

describe('ImportAccount', () => {
  let outputSpy: jest.Mock
  let component: React.ReactElement<ImportAccountProps>
  const render = createClientRender({ strict: false })

  beforeEach(() => {
    (useSnackbar as jest.Mock).mockImplementation(() => ({enqueueSnackbar: jest.fn()}))
    outputSpy = jest.fn()
    component = <ImportAccount onImport={outputSpy} onBack={outputSpy} />
  })

  const setup = (cmp: ReactElement) => {
    const utils = render(cmp)
    const root = utils.getByTestId(bem())
    const seed = getById(utils.container, bem('Seed'))
    const password = getById(utils.container, bem('Password'))
    const confirm = getById(utils.container, bem('Confirm'))
    const submit = utils.getByTestId(bem('Import'))

    return { root, seed, password, confirm, submit, ...utils }
  }

  it('renders', () => {
    const { getByTestId } = setup(component)

    expect(getByTestId(bem())).toBeInTheDocument()
  })
})
