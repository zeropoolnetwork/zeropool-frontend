export const exportToClipboard = (
  name: string,
  value: string,
  showSnack: (text: string, options: any) => void,
) => {
  navigator.clipboard.writeText(value).then(
    () => {
      showSnack(`${name} copied to the clipboard`, { variant: 'success' })
    },
    (err) => {
      showSnack(`Can't access clipboard`, { variant: 'error' })
    },
  )
}