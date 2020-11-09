import { Mnemonic } from 'wallet.ts';

jest.mock('wallet.ts', () => {
  return {
    Mnemonic: {
      generate: jest.fn((val: any) => ({ words: ['1', '2', '3', '4', '5', '5', '6', '7', '6', '8', '9', '10', '11', '12', '13', '14', '15'] }))
    }
  }
});

fdescribe('Seed generation helper', () => {
  it('generates seed phrase as array of 12 unic words', () => {
    const seed = require('./seed.helper').generateSeed();

    expect(seed).toStrictEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
  });
});
