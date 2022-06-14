export const shuffleString = (str: string): string =>
  str
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('')

export const shuffleArray = (arr: string[]): string[] => arr.sort(() => 0.5 - Math.random())
