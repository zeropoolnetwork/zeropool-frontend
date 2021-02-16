import { generateMnemonic, validateMnemonic } from 'zeropool-api-js/lib/utils';

export const generateSeed = () => {
  return generateMnemonic().split(' ');
}

export const validateSeed = (seed: string[]): boolean => {
  return validateMnemonic(seed.join(' '));
}
