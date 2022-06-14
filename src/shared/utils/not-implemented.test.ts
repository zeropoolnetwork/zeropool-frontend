import { notImplemented } from 'shared/utils/not-implemented'

describe('notImplemented helper', () => {
  it('returns True if passed error object contain message with corresponding text', () => {
    const error = new Error('This method NOT yet implemented')

    expect(notImplemented(error)).toBe(true)
  })

  it('returns False if passed error object not contain message with corresponding text', () => {
    const error = new Error('This method will be implemented soon')

    expect(notImplemented(error)).toBe(false)
    expect(notImplemented(new Error())).toBe(false)
  })
})
