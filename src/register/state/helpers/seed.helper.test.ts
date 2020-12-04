import { Mnemonic } from 'wallet.ts';
import { validateSeed } from './seed.helper';

jest.mock('wallet.ts', () => {
  return {
    Mnemonic: {
      generate: jest.fn((val: any) => ({ words: ['1', '2', '3', '4', '5', '5', '6', '7', '6', '8', '9', '10', '11', '12', '13', '14', '15'] }))
    }
  }
});

describe('Seed generation helper', () => {
  describe('`generateSeed` method', () => {

    it('generates seed phrase as array of 12 unic words', () => {
      const seed = require('./seed.helper').generateSeed();

      expect(seed).toStrictEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
    });
  });

  describe('validateSeed method', () => {
    it('validates that seed had 12 words with uniq first 4 letters', () => {
      const goodSeed = ['dove', 'lumber', 'quote', 'board', 'young', 'robust', 'kit', 'invite', 'plastic', 'regular', 'skull', 'history'];
      const shortSeed = goodSeed.slice(0, -1);
      const biggerSeed = [...goodSeed, 'test'];
      const seedWithDublicatedWord = [...goodSeed.slice(0, -1), goodSeed[1]];

      expect(validateSeed(goodSeed)).toBeTruthy();
      expect(validateSeed(shortSeed)).toBeFalsy();
      expect(validateSeed(biggerSeed)).toBeFalsy();
      expect(validateSeed(seedWithDublicatedWord)).toBeFalsy();
    });

    it('validates that all words are taken from bip39 dictioanary', () => {
      const seed = ['dove', 'lumber', 'quote', 'board', 'young', 'robust', 'kit', 'invite', 'plastic', 'regular', 'skull', 'history'];

      expect(validateSeed(seed)).toBeTruthy();
      expect(validateSeed([...seed.slice(0, -1), 'qwerty'])).toBeFalsy();
    });
  });

});
