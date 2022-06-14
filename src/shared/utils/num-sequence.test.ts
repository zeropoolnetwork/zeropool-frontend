import { numSequence } from './num-sequence'

describe('Num sequence helper', () => {
  it('returns [0] when gets 1', () => {
    expect(numSequence(1)).toEqual([0])
  })

  it('returns [0,1,2] when gets 3', () => {
    expect(numSequence(3)).toEqual([0, 1, 2])
  })

  it('returns [] when gets < 1 or not a number', () => {
    expect(numSequence(0)).toEqual([])
    expect(numSequence(-2)).toEqual([])
    expect(numSequence('gay' as any)).toEqual([])
    expect(numSequence('1' as any)).toEqual([])
    expect(numSequence(undefined as any)).toEqual([])
  })
})
