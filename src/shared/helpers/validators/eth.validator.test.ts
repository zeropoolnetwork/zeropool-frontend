import { isEthereumAddress } from './eth.validator';

describe('Eth Address validator', () => {
  const valid = '0xc1912fee45d61c87cc5ea59dae31190fffff232d';
  const invalid = '0xc1912fee45d61c87cc5ea59dae31190fffff232';
  const wrongChecksumUppercase = '0xC1912FEE45D61C87CC5EA59DAE31190FFFFF232D';
  const wrongChecksum = '0xc1912fee45d61c87cc5ea59dae31190fffff232D';

  it('returns true if address valid', () => {
    expect(isEthereumAddress(valid)).toBe(true);
  });

  it('returns true if address valid, uppercase with wrong checksum', () => {
    expect(isEthereumAddress(wrongChecksumUppercase)).toBe(true);
  });

  it('returns false if address invalid', () => {
    expect(isEthereumAddress(invalid)).toBe(false);
  });

  xit('returns false if address valid, but with wrong checksum', () => {
    expect(isEthereumAddress(wrongChecksum)).toBe(false);
  });
});