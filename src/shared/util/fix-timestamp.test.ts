import { fixTimestamp } from './fix-timestamp'

describe('fixTimestamp helper', () => {
  it('adds 000 to the timestamp if it has less then 13 digits', () => {
    const timestamp = Date.now().toString().slice(0, -3)

    expect(fixTimestamp(timestamp)).toBe(+`${timestamp}000`)
  })

  it('pass timestamp as is if it has 13 digits', () => {
    const timestamp = Date.now()

    expect(fixTimestamp(timestamp)).toBe(timestamp)
  })
})
