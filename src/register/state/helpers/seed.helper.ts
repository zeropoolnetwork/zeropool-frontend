import bip39 from 'bip39-light'

export const generateSeed = (): string[] => {
  return bip39.generateMnemonic().split(' ')
}

export const validateSeed = (seed: string[]): boolean => {
  return bip39.validateMnemonic(seed.join(' '))
}
