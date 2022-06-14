import { isNumber, isString } from './is'

describe("'Is' helper", () => {
  describe('isNumber method', () => {
    it('returns True if passed value is a number', () => {
      expect(isNumber(1)).toBe(true)
    })

    it('returns False if passed value is not a number', () => {
      expect(isNumber('2')).toBe(false)
      expect(isNumber({ '1': 1 })).toBe(false)
      expect(isNumber([1])).toBe(false)
    })
  })

  describe('isString method', () => {
    it('returns True if passed value is a number', () => {
      expect(isString('1')).toBe(true)
    })

    it('returns False if passed value is not a number', () => {
      expect(isString(2)).toBe(false)
      expect(isString({ '1': 1 })).toBe(false)
      expect(isString([1])).toBe(false)
    })
  })
})
