import { apiErrorHandler } from 'wallet/api/error.handlers';

describe('Api error handler', () => {
  it('returns the error message', () => {
    const message = 'Error'
    const result = apiErrorHandler(message)

    expect(result).toBe(message)
  })

  it('returns "Unknown error" if error message is not a string', () => {
    const message = 123
    const result = apiErrorHandler(message as any)

    expect(result).toBe('Unknown error')
  })

  it('returns "Empty error message" if error message is an empty string', () => {
    const message = ''
    const result = apiErrorHandler(message)

    expect(result).toBe('Empty error message')
  })

  it(`returns "Your device hasn't enought memory to run this aplication" if error message is "Out of memory"`, () => {
    const message = 'Out of memory'
    const expected = `Your device hasn't enought memory to run this aplication`
    const result = apiErrorHandler(message)

    expect(result).toBe(expected)
  })

  it(`returns "Your browser can't run our aplication(Shared Web Workers not supported)" if error message is "Can't find variable: Worke"`, () => {
    const message = `Can't find variable: Worke`
    const expected = `Your browser can't run our aplication(Shared Web Workers not supported)`
    const result = apiErrorHandler(message)

    expect(result).toBe(expected)
  })

  it(`returns 'Insufficient funds to complete the translation. Please, top up your public balace' if error includes 'Insufficient funds'`, () => {
    const message = 'Insufficient funds'
    const expected = 'Insufficient funds to complete the translation. Please, top up your public balace'
    const result = apiErrorHandler(message)

    expect(result).toBe(expected)
  })

  it(`returns 'Insufficient balance to complete the translation. Please, top up your private balance' if error includes 'Insufficient balance'`, () => {
    const message = 'Insufficient balance'
    const expected = 'Insufficient balance to complete the translation. Please, top up your private balance'
    const result = apiErrorHandler(message)

    expect(result).toBe(expected)
  })
});