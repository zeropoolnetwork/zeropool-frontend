export const promiceErrorHandler = <T>(mock: T) => (err: Error) => {
  console.error('Api error:')
  console.error(err)

  return mock
}
