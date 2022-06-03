export const copyToClipboard = (
  str: string,
  name: string,
  fn: (str: string, config: any) => void,
): void => {
  navigator.clipboard.writeText(str).then(
    () => {
      fn(`${name} copied to the clipboard`, { variant: 'success' })
    },
    (err) => {
      fn(`Can't access clipboard`, { variant: 'error' })
    },
  )
}
