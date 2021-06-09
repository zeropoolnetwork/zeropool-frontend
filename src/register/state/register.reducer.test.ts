import { deepFreeze } from 'shared/util/deep-freeze'

import { registerActions as actions } from 'register/state/register.actions'
import { generateSeed } from 'register/state/helpers/seed.helper'

import { initialRegisterState, registerReducer, RegisterState } from './register.reducer'

const generateSeedMock = generateSeed as jest.Mock

jest.mock('register/state/helpers/seed.helper', () => ({
  generateSeed: jest.fn(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
}))
describe('Register reducer', () => {
  const initialState: RegisterState = deepFreeze(initialRegisterState)
  const seed = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

  beforeEach(() => {
    generateSeedMock.mockImplementation(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  })

  it('handles Generate Seed action', () => {
    const state = registerReducer(initialState, actions.generateSeed())

    expect(state.seed.length).toBe(12)
  })

  it('handles Submit Seed action', () => {
    const state = registerReducer({ ...initialState, seed }, actions.submitSeed())

    expect(state.seed.length).toBe(12)
  })
})
