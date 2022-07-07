import { CircularProgress, Tooltip } from '@mui/material'
import React, { MouseEvent } from 'react'
import { useSnackbar } from 'notistack'
import { cn } from '@bem-react/classname'

import './DemoHeader.scss'

import { beautifyAddress, beautifyAmount } from 'shared/helpers/addres.helper'
import { copyToClipboard } from 'shared/utils/copy-to-clipboard'

export const componentId = 'DemoHeader'
const bem = cn(componentId)

export type DemoHeaderProps = {
  publicBalance?: number
  privateBalance?: number
  tokenBalance?: number
  walletAddress?: string
  privateAddress?: string
}

export const DemoHeader: React.FC<DemoHeaderProps> = ({
  publicBalance,
  privateBalance,
  tokenBalance,
  walletAddress,
  privateAddress,
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const handleAddressClick = (event: MouseEvent<HTMLSpanElement>): void => {
    const address = (event.target as HTMLElement).id === 'Public' ? walletAddress : privateAddress
    copyToClipboard((address as string), 'Address', enqueueSnackbar)
  }
  return (
    <div className={bem()} data-testid={bem()}>
      <div className={bem('Amounts')}>
        <div>
          Public address:&nbsp;

          <span id="Public" onClick={handleAddressClick} style={{ cursor: 'pointer' }}>
            {beautifyAddress(walletAddress|| '')}
          </span>
        </div>

        <div>
          Private address:&nbsp;

          <span id="Private" onClick={handleAddressClick} style={{ cursor: 'pointer' }}>
            {beautifyAddress(privateAddress || '')}
          </span>
        </div>

        <div>
          Public balance:&nbsp;

          <Tooltip title={publicBalance || ''}>
            {publicBalance === undefined
              ? <CircularProgress className={bem('Progress')} color="inherit" />
              : <span>{beautifyAmount(publicBalance)}</span>}
          </Tooltip>
        </div>

        <div>
          Token balance:&nbsp;

          <Tooltip title={tokenBalance || ''}>
            {tokenBalance === undefined
              ? <CircularProgress className={bem('Progress')} color="inherit" />
              : <span>{beautifyAmount(tokenBalance)}</span>}
          </Tooltip>
        </div>

        <div>
          Private balance:&nbsp;

          <Tooltip title={privateBalance || ''}>
            {privateBalance === undefined
              ? <CircularProgress className={bem('Progress')} color="inherit" />
              : <span>{beautifyAmount(privateBalance)}</span>}
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
