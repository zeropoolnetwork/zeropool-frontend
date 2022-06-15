import React from 'react'
import { cn } from '@bem-react/classname'
import NumberFormat from 'react-number-format'

import './DemoHeader.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { beautifyAmount } from 'shared/helpers/addres.helper'
import { CircularProgress, Tooltip } from '@mui/material'
import { useSnackbar } from 'notistack'

export const componentId = 'DemoHeader'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type DemoHeaderProps = {
  publicBalance?: number
  privateBalance?: number
  tokenBalance?: number
  walletAddress?: string
}

export const DemoHeader: React.FC<DemoHeaderProps> = ({
  publicBalance,
  privateBalance,
  tokenBalance,
  walletAddress,
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const handleAddressClick = (): void => {
    navigator.clipboard.writeText(walletAddress as string).then(
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
          Address:&nbsp;

          <span onClick={handleAddressClick} style={{ cursor: 'pointer' }}>
            {walletAddress}
          </span>
        </div>

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
