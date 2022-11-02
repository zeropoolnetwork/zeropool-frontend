import { lowBalanceHelper } from 'wallet/state/helpers/low-balance.helper'

describe('LowBalanceHelper', () => {
  describe('lowPublicBalance', () => {
    it('should retunt false if enough funds', () => {
      const transferType = 'funds'
      const amount = '0.1'
      const publicBalance = '0.2'
      const tokenBalance = '0.3'
      const privateBalance = '0.4'
      expect(
        lowBalanceHelper(
          transferType,
          amount,
          publicBalance,
          tokenBalance,
          privateBalance,
        ),
      ).toBe(false)
    })

    it(`should return true if not enough funds`, () => {
      const transferType = 'funds'
      const amount = '0.1'
      const publicBalance = '0.0'
      const tokenBalance = '0.3'
      const privateBalance = '0.4'
      expect(
        lowBalanceHelper(
          transferType,
          amount,
          publicBalance,
          tokenBalance,
          privateBalance,
        ),
      ).toBe(true)
    })
  })

  describe(`should return true if low tokenBalance`, () => {
    it(`publicToPrivate`, () => {
      const transferType = 'publicToPrivate'
      const amount = '0.1'
      const publicBalance = '0.2'
      const tokenBalance = '0.0'
      const privateBalance = '0.4'
      expect(
        lowBalanceHelper(
          transferType,
          amount,
          publicBalance,
          tokenBalance,
          privateBalance,
        ),
      ).toBe(true)
    })

    it(`publicToPublic`, () => {
      const transferType = 'publicToPublic'
      const amount = '0.1'
      const publicBalance = '0.2'
      const tokenBalance = '0.0'
      const privateBalance = '0.1'
      expect(
        lowBalanceHelper(
          transferType,
          amount,
          publicBalance,
          tokenBalance,
          privateBalance,
        ),
      ).toBe(true)
    })
  })

  describe(`should return false if enough tokenBalance`, () => {
    it(`publicToPublic`, () => {
      const transferType = 'publicToPublic'
      const amount = '0.1'
      const publicBalance = '0.2'
      const tokenBalance = '0.3'
      const privateBalance = '0.4'
      expect(
        lowBalanceHelper(
          transferType,
          amount,
          publicBalance,
          tokenBalance,
          privateBalance,
        ),
      ).toBe(false)
    })

    it(`publicToPrivate`, () => {
      const transferType = 'publicToPrivate'
      const amount = '0.1'
      const publicBalance = '0.2'
      const tokenBalance = '0.3'
      const privateBalance = '0.2'

      expect(
        lowBalanceHelper(
          transferType,
          amount,
          publicBalance,
          tokenBalance,
          privateBalance,
        ),
      ).toBe(false)
    })
  })

  describe(`should return true if low privateBalance`, () => {
    it(`privateToPrivate`, () => {
      const transferType = 'privateToPrivateOut'
      const amount = '0.1'
      const publicBalance = '0.2'
      const tokenBalance = '0.3'
      const privateBalance = '0.0'

      expect(
        lowBalanceHelper(
          transferType,
          amount,
          publicBalance,
          tokenBalance,
          privateBalance,
        ),
      ).toBe(true)
    })
    it(`privateToPublic`, () => {
      const transferType = 'privateToPublic'
      const amount = '0.1'
      const publicBalance = '0.2'
      const tokenBalance = '0.3'
      const privateBalance = '0.0'

      expect(
        lowBalanceHelper(
          transferType,
          amount,
          publicBalance,
          tokenBalance,
          privateBalance,
        ),
      ).toBe(true)
    })
  })

  describe(`should return false if enough privateBalance`, () => {
    it(`privateToPrivate`, () => {
      const transferType = 'privateToPrivateOut'
      const amount = '0.1'
      const publicBalance = '0.2'
      const tokenBalance = '0.3'
      const privateBalance = '0.4'

      expect(
        lowBalanceHelper(
          transferType,
          amount,
          publicBalance,
          tokenBalance,
          privateBalance,
        ),
      ).toBe(false)
    })
    it(`privateToPublic`, () => {
      const transferType = 'privateToPublic'
      const amount = '0.1'
      const publicBalance = '0.2'
      const tokenBalance = '0.3'
      const privateBalance = '0.4'

      expect(
        lowBalanceHelper(
          transferType,
          amount,
          publicBalance,
          tokenBalance,
          privateBalance,
        ),
      ).toBe(false)
    })
  })
})
