export const notImplemented = (err: { message?: string; code?: number }) =>
  typeof err?.message === 'string' && /(?=.*not)(?=.*implemented)/.test(err.message.toLowerCase())
