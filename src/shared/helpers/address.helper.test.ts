import { beautifyAdress, beautifyAmount } from 'shared/helpers/addres.helper'

describe('adress beautifyer', () => {
  it('transorms adress to 0x123...abcd', () => {
    const address = '0xA646dc3DD68338Ee960eA131cfc798D9bF66070d'
    const result = '0xA6...070d'

    expect(beautifyAdress(address, 4)).toBe(result)
  })

  it('transforms amount 0.0000000000000003 to 0.0...3', () => {
    const amount = '0.00000000000000003'
    const result = '0.0...3'

    expect(beautifyAmount(amount)).toBe(result)
  })

  it('transforms amount 123456789 to 123...9', () => {
    const amount = '123456789'
    const result = '123...9'

    expect(beautifyAmount(amount)).toBe(result)
  })

  it('transforms amount 999.56789 to 999.5...9', () => {
    const amount = '999.56789'
    const result = '999.5...9'

    expect(beautifyAmount(amount)).toBe(result)
  })

  it('transforms amount 9999.56789 to 999...9', () => {
    const amount = '9999.56789'
    const result = '999...9'

    expect(beautifyAmount(amount)).toBe(result)
  })

})

