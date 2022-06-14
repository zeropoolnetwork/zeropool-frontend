export const isObjectWithData = <T>(x: any): x is { data: T } => {
  return !!x.data
}
