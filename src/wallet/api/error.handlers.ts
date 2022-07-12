import toast from 'shared/helpers/toast.helper'

export const promiceErrorHandler = <T>(mock: T, message?: string) => (err: Error) => {
  console.error('Api error:')
  console.error(err)
  toast.error(message || err.message)

  return mock
}

export const apiErrorHandler = (message?: string): string  => {
  var result
  if (typeof(message) === 'string' && message.length > 0) {
    if (message.includes('Out of memory')) {
      result = `Your device hasn't enought memory to run this aplication`
    } else if (message.includes(`Can't find variable: Worke`)) {
      result = `Your browser can't run our aplication(Shared Web Workers not supported)`
    } else { result = message }
  } else if (message === '') {
    result = 'Empty error message'
  } else {
    result = 'Unknown error'
  }

  
  
  return result
}
