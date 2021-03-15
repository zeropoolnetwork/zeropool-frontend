import React from 'react'
import { useSnackbar, WithSnackbarProps } from 'notistack'

interface IProps {
  setUseSnackbarRef: (showSnackbar: WithSnackbarProps) => void
}

type OptionsObject = {
  [key: string]: string
}

const InnerSnackbarUtilsConfigurator: React.FC<IProps> = (props: IProps) => {
  props.setUseSnackbarRef(useSnackbar())
  return null
}

let useSnackbarRef: WithSnackbarProps
const setUseSnackbarRef = (useSnackbarRefProp: WithSnackbarProps) => {
  useSnackbarRef = useSnackbarRefProp
}

export const SnackbarUtilsConfigurator = () => {
  return <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
}

export default {
  success(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: 'success' })
  },
  warning(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: 'warning' })
  },
  info(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: 'info' })
  },
  error(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: 'error' })
  },
  toast(msg: string, options: OptionsObject = {}) {
    useSnackbarRef.enqueueSnackbar(msg, options)
  },
}
