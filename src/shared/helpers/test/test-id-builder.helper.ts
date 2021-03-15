export const testIdBuilder = (baseName: string) => (...names: string[]) =>
  names.reduce((prev, curr) => `${prev}-${curr}`, baseName)
