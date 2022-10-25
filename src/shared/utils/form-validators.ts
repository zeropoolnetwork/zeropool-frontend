import { validateSeed } from 'register/state/helpers/seed.helper'

export const accountIdValidator = {
  required: false,
}

export const passwordValidator = {
  required: 'Required',
  pattern: {
    value: /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/,
    message: 'Use letters and numbers',
  },
  minLength: {
    value: 8,
    message: 'Use at least 8 characters',
  },
}

export const seedValidator = {
  required: 'Required',
  validate: (value: string) => validateSeed(value.split(' ')),
}

export const confirmValidator = (getValues: () => any) => ({
  required: 'Required',
  validate: (value: string) => value === getValues().password,
})
