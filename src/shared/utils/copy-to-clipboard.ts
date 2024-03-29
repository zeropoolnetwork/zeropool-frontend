export const copyToClipboard = (
  value: string,
  name: string,
  fn: (value: string, config: any) => void,
): void => {
  if (!navigator.clipboard) {
    fn('Clipboard is not available', { variant: 'error' })

    return
  }

  navigator.clipboard.writeText(value).then(
    () => {
      fn(`${name} copied to the clipboard`, { variant: 'success' })
    },
    (err) => {
      fn(`Can't access clipboard`, { variant: 'error' })
    },
  )
}
