import { deepFreeze } from 'shared/utils/deep-freeze'

import { generateSeed } from 'register/state/helpers/seed.helper'

import { initialRegisterState, registerSlice, RegisterState } from './register.reducer'
import { RegisterStage } from 'register/state/models/register-stage'

const generateSeedMock = generateSeed as jest.Mock
const rsa = registerSlice.actions

jest.mock('register/state/helpers/seed.helper', () => ({
  generateSeed: jest.fn(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
}))
describe('Register reducer', () => {
  const initialState: RegisterState = deepFreeze(initialRegisterState)
  const seed = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

  beforeEach(() => {
    generateSeedMock.mockImplementation(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  })

  it('handles generateSeed action', () => {
    const state = registerSlice.reducer(initialState, rsa.generateSeed())

    expect(state.seed.length).toBe(12)
  })

  it('handles submitSeed action', () => {
    const state = registerSlice.reducer({ ...initialState, seed }, rsa.submitSeed())

    expect(state.seed.length).toBe(12)
  })

  describe('handles stepBack action', () => {
    it('should reset state if on import stage', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.IMPORT,
        showSteps: true,
        seed: ['test'],
      }

      const newState = registerSlice.reducer(oldState, rsa.stepBack())

      expect(newState).toEqual(initialRegisterState)
    })

    it('should reset stage if on step 1', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP1,
      }

      const newState = registerSlice.reducer(oldState, rsa.stepBack())

      expect(newState).toEqual(initialRegisterState)
    })

    it('should reduce stage by 1', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP2,
      }

      const newState = registerSlice.reducer(oldState, rsa.stepBack())

      expect(newState.stage).toEqual(RegisterStage.STEP1)
    })

    it('should set showSteps property to false if stage undifinded', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: undefined,
        showSteps: true,
      }

      const newState = registerSlice.reducer(oldState, rsa.stepBack())

      expect(newState.showSteps).toBe(false)
    })

    it('should set showSteps property to false if stage 1', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP1,
        showSteps: true,
      }

      const newState = registerSlice.reducer(oldState, rsa.stepBack())

      expect(newState.showSteps).toBe(false)
    })

    it('should set showSteps property to true if stage > 1', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP4,
        showSteps: false,
      }

      const newState = registerSlice.reducer(oldState, rsa.stepBack())

      expect(newState.showSteps).toBe(true)
    })

    it('resets seed frase if stage is not 2', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP2,
      }

      const newState = registerSlice.reducer(oldState, rsa.stepBack())

      expect(newState.seed).toEqual([])
    })

    it('keeps seed frase if stage is not 2', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP3,
        seed: ['test'],
      }

      const newState = registerSlice.reducer(oldState, rsa.stepBack())

      expect(newState.seed).toBe(oldState.seed)
    })
  })

  describe('handles startRegisterAccount action', () => {
    it('sets showSteps to true', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        showSteps: false,
      }

      const newState = registerSlice.reducer(oldState, rsa.startRegister())

      expect(newState.showSteps).toBe(true)
    })

    it('sets stage to step 1', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP3,
      }

      const newState = registerSlice.reducer(oldState, rsa.startRegister())

      expect(newState.stage).toBe(RegisterStage.STEP1)
    })
  })

  describe('handles generateSeed action', () => {
    it('sets stage to step 2', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP3,
      }

      const newState = registerSlice.reducer(oldState, rsa.generateSeed())

      expect(newState.stage).toBe(RegisterStage.STEP2)
    })

    it('sets generateSeed to false', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        seedConfirmed: true,
      }

      const newState = registerSlice.reducer(oldState, rsa.generateSeed())

      expect(newState.seedConfirmed).toBe(false)
    })

    it('generates new seed', () => {
      const newState = registerSlice.reducer(
        { ...initialState, seed: [] },
        rsa.generateSeed(),
      )

      expect(newState.seed.length).toBe(12)
    })
  })

  describe('handles submitSeed action', () => {
    it('sets stage to step 3', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP2,
      }

      const newState = registerSlice.reducer(oldState, rsa.submitSeed())

      expect(newState.stage).toBe(RegisterStage.STEP3)
    })

    it('sets seedConfirmed to false', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        seedConfirmed: false,
      }

      const newState = registerSlice.reducer(oldState, rsa.submitSeed())

      expect(newState.seedConfirmed).toBe(true)
    })
  })

  describe('handles confirmSeed action', () => {
    it('sets stage to step 4', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP1,
      }

      const newState = registerSlice.reducer(oldState, rsa.confirmSeed())

      expect(newState.stage).toBe(RegisterStage.STEP4)
    })

    it('sets seedConfirmed to false', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        seedConfirmed: false,
      }

      const newState = registerSlice.reducer(oldState, rsa.confirmSeed())

      expect(newState.seedConfirmed).toBe(true)
    })
  })

  describe('handles register action', () => {
    it('sets stage to step 4', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP1,
      }

      const newState = registerSlice.reducer(oldState, rsa.register('test'))

      expect(newState.stage).toBe(undefined)
    })

    it('sets showSteps to false', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        showSteps: true,
      }

      const newState = registerSlice.reducer(oldState, rsa.register('test'))

      expect(newState.showSteps).toBe(false)
    })
  })

  describe('handles startImportAccount action', () => {
    it('sets stage to step 4', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP1,
      }

      const newState = registerSlice.reducer(oldState, rsa.startImport())

      expect(newState.stage).toBe(RegisterStage.IMPORT)
    })

    it('sets seedConfirmed to false', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        showSteps: true,
      }

      const newState = registerSlice.reducer(oldState, rsa.startImport())

      expect(newState.showSteps).toBe(false)
    })
  })

  describe('handles reset action', () => {
    it('reset acount', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP1,
        seed: ['test'],
      }

      const newState = registerSlice.reducer(oldState, rsa.reset())

      expect(newState).toEqual(initialRegisterState)
    })
  })

  describe('handles importAccount action', () => {
    it('sets stage to step 4', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP1,
      }

      const newState = registerSlice.reducer(
        oldState,
        rsa.import({ seed: [''], password: '', accountId: '' }),
      )

      expect(newState.stage).toBe(undefined)
    })

    it('sets seedConfirmed to false', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        showSteps: true,
      }

      const newState = registerSlice.reducer(
        oldState,
        rsa.import({ seed: [''], password: '', accountId: '' }),
      )

      expect(newState.showSteps).toBe(false)
    })
  })
})
