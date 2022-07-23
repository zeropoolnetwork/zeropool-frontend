import { generateSeed } from 'register/state/helpers/seed.helper';

describe('Seed Helper', () => {
    xdescribe('getSeed', () => {
        const generateSeedMock = generateSeed as jest.Mock

        it('should return the seed', () => {
            //generateMnemonicMock.mockImplementation(() => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])
            const result = generateSeed();
            expect(result).toEqual(1);
        });

        it('should return the seed without dublications', () => {
            const seed = 'test test';
            //const result = getSeed(seed);
            expect(seed).toEqual(['test']);
        });

    });
})