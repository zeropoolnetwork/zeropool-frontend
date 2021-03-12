export const notImplemented = (err: Error) => 
  typeof(err?.message) === 'string' && 
  err.message.includes('not implemented')
