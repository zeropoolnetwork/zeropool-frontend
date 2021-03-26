export const debugThen = <T>(value: T) => {
  // tslint:disable-next-line: no-debugger
  // debugger
  console.log('[DEBUGGER]:')
  console.warn(value)

  return value
}
