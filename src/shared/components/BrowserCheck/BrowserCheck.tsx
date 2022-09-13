import { useSnackbar } from 'notistack'
import { useEffect } from 'react'

import { Browser, detectBrowser } from 'shared/utils/detect-browser'

type BrowserCheckProps = {
  onBadBrowser: (badBrowser: boolean) => void
}

export const BrowserCheck: React.FC<BrowserCheckProps> = ({onBadBrowser}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const browser = detectBrowser()
  const badBrowsers: Browser[] = [
    // Browser.Firefox
  ]

  useEffect(() => {
    if(badBrowsers.includes(browser)) {
      enqueueSnackbar(`We are not supporting ${browser} at the moment,  please use different browser `, { variant: 'error', key: 'badBrowser'  , persist: true })
      onBadBrowser(true)
    }

    return () => {
      closeSnackbar('badBrowser')
    }
  },[])

  return (
    <div></div>
  )
}