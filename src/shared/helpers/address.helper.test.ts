import { beautifyAddress, beautifyAmount } from 'shared/helpers/address.helper'

jest.mock('shared/models')
jest.mock('shared/helpers/validators/eth.validator', () => {
  return {
    isEthereumAddress: jest.fn(),
  }
})

jest.mock('wallet/api/zeropool.api', () => ({
  isPrivateAddress: jest.fn(),
}))

describe('adress beautifyer', () => {
  it('transorms adress to 0x123...abcd', () => {
    const address = { address: '0xA646dc3DD68338Ee960eA131cfc798D9bF66070d' }
    const result = '0xA6...070d'

    expect(beautifyAddress(address)).toBe(result)
  })

  it('transorms doesnt transforms near address', () => {
    const address = { address: 'near.address' }
    const result = 'near.address'

    expect(beautifyAddress(address)).toBe(result)
  })

  it(`transorms doesnt transforms "Private destination"`, () => {
    const address = { address: 'Private destination' }
    const result = 'Private destination'

    expect(beautifyAddress(address)).toBe(result)
  })
})

describe('amount beautifyer', () => {
  it('transforms amount 0.0000000000000003 to 0.0...0003', () => {
    const amount = '0.00000000000000003'
    const result = '0.0...0003'

    expect(beautifyAmount(amount)).toBe(result)
  })

  it('transforms amount 0.012345678912345 to 0.01234567...', () => {
    const amount = '0.012345678912345'
    const result = '0.01234567...'

    expect(beautifyAmount(amount)).toBe(result)
  })

  it('transforms amount 1234567892354234234234 to 12345678...', () => {
    const amount = '1234567892354234234234'
    const result = '12345678...'

    expect(beautifyAmount(amount)).toBe(result)
  })

  it('transforms amount 999.123456789 to 999.123...', () => {
    const amount = '999.123456789'
    const result = '999.123...'

    expect(beautifyAmount(amount)).toBe(result)
  })

  it('transforms amount 8e-9 to 0.0...0008', () => {
    const amount = 8e-9
    const result = '0.0...0008'

    expect(beautifyAmount(amount)).toBe(result)
  })

  it('transforms amount 0.010000001666267316 to 0.01...', () => {
    const amount = 0.010000001666267316
    const result = '0.01...'

    expect(beautifyAmount(amount)).toBe(result)
  })

  it('transforms amount 0.0105000000077 to 0.0105...', () => {
    const amount = 0.0105000000077
    const result = '0.0105...'

    expect(beautifyAmount(amount)).toBe(result)
  })

  it('transforms amount of 232342349 withot changes', () => {
    const amount = '232342349'
    const result = '23234234...'

    expect(beautifyAmount(amount)).toBe(result)
  })

  it('returns amount of 23234234 withot changes', () => {
    const amount = '23234234'
    const result = '23234234'

    expect(beautifyAmount(amount)).toBe(result)
  })
})
