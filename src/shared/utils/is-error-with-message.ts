export function isErrorWithMessage(x: any): x is Error {
  return typeof x.message === 'string'
}
