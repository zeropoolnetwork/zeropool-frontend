export const nearBug = (err: Error) =>
  typeof err?.message === 'string' && err.message.includes('[-32000]')
