export const copyFromClipboard = (
  name: string,
  fn: (value: string, config: any) => void,
  calback: (value: string) => void,
): void => {
  if (!navigator.clipboard) {
    fn('Clipboard is not available', { variant: 'error' })

    return
  }
  navigator.clipboard.readText().then(
    (text) => {
        fn(`${name} copied from the clipboard`, { variant: 'success' })
        calback(text)

    },
    (err) => {
      fn(`Can't access clipboard`, { variant: 'error' })
    },
  )
}