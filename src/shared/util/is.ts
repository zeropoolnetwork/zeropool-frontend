export const isNumber = (x: any): x is number => {
  return typeof x === "number";
}

export const isString = (x: any): x is string => {
  return typeof x === "string";
}