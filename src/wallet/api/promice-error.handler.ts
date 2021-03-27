import toast from 'shared/helpers/toast.helper'

export const promiceErrorHandler = <T>(mock: T, message?: string) => (err: Error) => {
  console.error('Api error:')
  console.error(err)
  toast.error(message || err.message)

  return mock
}
