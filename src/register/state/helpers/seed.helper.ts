import bip39 from 'bip39-light'

export const generateSeed = (): string[] => {
  const seed = bip39.generateMnemonic().split(' ')
  if (new Set(seed).size === seed.length) {
    return seed
  } else {
    return generateSeed()
  }
}

export const validateSeed = (seed: string[]): boolean => {
  return bip39.validateMnemonic(seed.join(' '))
}
