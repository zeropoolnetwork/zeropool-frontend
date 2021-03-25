import { beautifyAdress } from 'shared/helpers/addres.helper'

describe('adress beautifyer', () => {
  it('transorms adress to 0x123...abcd', () => {
    const address = '0xA646dc3DD68338Ee960eA131cfc798D9bF66070d'
    const result = '0xA6...070d'

    expect(beautifyAdress(address, 4)).toBe(result)
  })
})
