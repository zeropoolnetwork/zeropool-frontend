import { deepFreeze } from 'shared/util/deep-freeze'

import { registerActions as actions } from 'register/state/register.actions'
import { generateSeed } from 'register/state/helpers/seed.helper'

import { initialRegisterState, registerReducer, RegisterState } from './register.reducer'
import { RegisterStage } from 'register/state/models/register-stage'

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

  it('handles generateSeed action', () => {
    const state = registerReducer(initialState, actions.generateSeed())

    expect(state.seed.length).toBe(12)
  })

  it('handles submitSeed action', () => {
    const state = registerReducer({ ...initialState, seed }, actions.submitSeed())

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

      const newState = registerReducer(oldState, actions.stepBack())

      expect(newState).toEqual(initialRegisterState) 
    });

    it('should reset stage if on step 1', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP1,
      }

      const newState = registerReducer(oldState, actions.stepBack())

      expect(newState).toEqual(initialRegisterState) 
    });

    it('should reduce stage by 1', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP2,
      }

      const newState = registerReducer(oldState, actions.stepBack())

      expect(newState.stage).toEqual(RegisterStage.STEP1) 
    });

    it('should set showSteps property to false if stage undifinded', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: undefined,
        showSteps: true,
      }

      const newState = registerReducer(oldState, actions.stepBack())

      expect(newState.showSteps).toBe(false) 
    });

    it('should set showSteps property to false if stage 1', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP1,
        showSteps: true,
      }

      const newState = registerReducer(oldState, actions.stepBack())

      expect(newState.showSteps).toBe(false) 
    });

    it('should set showSteps property to true if stage > 1', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP4,
        showSteps: false,
      }

      const newState = registerReducer(oldState, actions.stepBack())

      expect(newState.showSteps).toBe(true) 
    });

    it('resets seed frase if stage is not 2', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP2,
      }

      const newState = registerReducer(oldState, actions.stepBack())

      expect(newState.seed).toEqual([]) 
    });

    it('keeps seed frase if stage is not 2', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP3,
        seed: ['test'],
      }

      const newState = registerReducer(oldState, actions.stepBack())

      expect(newState.seed).toBe(oldState.seed) 
    });
  });

  describe('handles startRegisterAccount action', () => {
    it('sets showSteps to true', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        showSteps: false,
      }

      const newState = registerReducer(oldState, actions.startRegisterAccount())

      expect(newState.showSteps).toBe(true) 
    });

    it('sets stage to step 1', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP3,
      }

      const newState = registerReducer(oldState, actions.startRegisterAccount())

      expect(newState.stage).toBe(RegisterStage.STEP1) 
    });
  });

  describe('handles generateSeed action', () => {
    it('sets stage to step 2', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP3,
      }

      const newState = registerReducer(oldState, actions.generateSeed())

      expect(newState.stage).toBe(RegisterStage.STEP2) 
    });

    it('sets generateSeed to false', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        seedConfirmed: true,
      }

      const newState = registerReducer(oldState, actions.generateSeed())

      expect(newState.seedConfirmed).toBe(false) 
    });

    it('generates new seed', () => {
      const newState = registerReducer({ ...initialState, seed: []}, actions.generateSeed())
  
      expect(newState.seed.length).toBe(12)
    })
  });

  describe('handles submitSeed action', () => {
    it('sets stage to step 3', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP2,
      }

      const newState = registerReducer(oldState, actions.submitSeed())

      expect(newState.stage).toBe(RegisterStage.STEP3) 
    });

    it('sets seedConfirmed to false', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        seedConfirmed: true,
      }

      const newState = registerReducer(oldState, actions.submitSeed())

      expect(newState.seedConfirmed).toBe(false) 
    });
  });

  describe('handles confirmSeed action', () => {
    it('sets stage to step 4', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP1,
      }

      const newState = registerReducer(oldState, actions.confirmSeed())

      expect(newState.stage).toBe(RegisterStage.STEP4) 
    });

    it('sets seedConfirmed to false', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        seedConfirmed: false,
      }

      const newState = registerReducer(oldState, actions.confirmSeed())

      expect(newState.seedConfirmed).toBe(true) 
    });
  });

  describe('handles register action', () => {
    it('sets stage to step 4', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP1,
      }

      const newState = registerReducer(oldState, actions.register('test'))

      expect(newState.stage).toBe(undefined) 
    });

    it('sets showSteps to false', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        showSteps: true,
      }

      const newState = registerReducer(oldState, actions.register('test'))

      expect(newState.showSteps).toBe(false) 
    });
  });

  describe('handles startImportAccount action', () => {
    it('sets stage to step 4', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP1,
      }

      const newState = registerReducer(oldState, actions.startImportAccount())

      expect(newState.stage).toBe(RegisterStage.IMPORT) 
    });

    it('sets seedConfirmed to false', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        showSteps: true,
      }

      const newState = registerReducer(oldState, actions.startImportAccount())

      expect(newState.showSteps).toBe(false) 
    });
  });

  describe('handles reset action', () => {
    it('reset acount', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP1,
        seed: ['test'],
      }

      const newState = registerReducer(oldState, actions.reset())

      expect(newState).toEqual(initialRegisterState) 
    });
  });

  describe('handles importAccount action', () => {
    it('sets stage to step 4', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        stage: RegisterStage.STEP1,
      }

      const newState = registerReducer(oldState, actions.importAccount({seed:[''], password: ''}))

      expect(newState.stage).toBe(undefined) 
    });

    it('sets seedConfirmed to false', () => {
      const oldState: RegisterState = {
        ...initialRegisterState,
        showSteps: true,
      }

      const newState = registerReducer(oldState, actions.importAccount({seed:[''], password: ''}))

      expect(newState.showSteps).toBe(false) 
    });
  });
})
