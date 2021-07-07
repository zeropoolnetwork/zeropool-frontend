export const notImplemented = (err: Error) =>
  typeof err?.message === 'string' && /(?=.*not)(?=.*implemented)/.test(err.message.toLowerCase())
