import { CircularProgress, Tooltip } from '@mui/material'
import React, { MouseEvent } from 'react'
import { useSnackbar } from 'notistack'
import { cn } from '@bem-react/classname'

import './DemoHeader.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { beautifyAddress, beautifyAmount } from 'shared/helpers/addres.helper'

export const componentId = 'DemoHeader'

const css = cn(componentId)
const test = testIdBuilder(componentId)

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
    navigator.clipboard.writeText(address as string).then(
      () => {
        enqueueSnackbar('Address copied to the clipboard', {
          variant: 'success',
        })
      },
      (err) => {
        enqueueSnackbar(`Can't access clipboard`, { variant: 'error' })
      },
    )
  }
  return (
    <div className={css()} data-testid={test()}>
      <div className={css('Amounts')}>
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

        {/* <Divider className={css('Divider')} variant="middle" /> */}

        <div>
          Public balance:&nbsp;

          <Tooltip title={publicBalance || ''}>
            {publicBalance === undefined
              ? <CircularProgress className={css('Progress')} color="inherit" />
              : <span>{beautifyAmount(publicBalance)}</span>}
          </Tooltip>
        </div>

        <div>
          Token balance:&nbsp;

          <Tooltip title={tokenBalance || ''}>
            {tokenBalance === undefined
              ? <CircularProgress className={css('Progress')} color="inherit" />
              : <span>{beautifyAmount(tokenBalance)}</span>}
          </Tooltip>
        </div>

        <div>
          Private balance:&nbsp;

          <Tooltip title={privateBalance || ''}>
            {privateBalance === undefined
              ? <CircularProgress className={css('Progress')} color="inherit" />
              : <span>{beautifyAmount(privateBalance)}</span>}
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
