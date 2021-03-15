export const recordFromArray = <T>(array: T[], id: string = 'id'): Record<string, T> =>
  array.reduce((obj, item) => {
    obj[item[id]] = item
    return obj
  }, {})
