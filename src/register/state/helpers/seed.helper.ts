const { randomBytes } = require('crypto');
const { Mnemonic } = require('wallet.ts');
const { wordList } = require('./word-list');

export const generateSeed = () => {
  return (Mnemonic.generate(randomBytes(32)).words as string[])
    .reduce((accu: string[], value: string): string[] => {
      if (accu.length < 12 && !accu.includes(value)) {
        accu.push(value);
      }

      return accu;
    }, []);
}

export const validateSeed = (seed: string[]): boolean => {
  if (!seed || seed.length !== 12) {
    return false;
  }

  let hasErrors = false;
  for (const word of seed) {
    if (
      typeof word !== 'string' ||
      word.length < 3 ||
      seed.filter((v) => (v === word)).length > 1 ||
      !(wordList as string[]).includes(word)
    ) {
      hasErrors = true;
      break;
    }
  }
  return !hasErrors;
}