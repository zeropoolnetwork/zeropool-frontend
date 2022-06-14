export const strToArray = (str: string): string[] =>
  str.split(/[ ,.]+/).filter((s) => !!s)
