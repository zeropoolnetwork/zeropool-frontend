export const promiseWithError = (errorMessage: string) => Promise.reject(new Error(errorMessage))
