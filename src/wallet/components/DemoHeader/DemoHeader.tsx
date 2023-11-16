import { CircularProgress, Tooltip } from '@mui/material'
import React, { MouseEvent } from 'react'
import { useSnackbar } from 'notistack'
import { cn } from '@bem-react/classname'

import './DemoHeader.scss'

import { beautifyAddress, beautifyAmount } from 'shared/helpers/address.helper'
import { copyToClipboard } from 'shared/utils/copy-to-clipboard'
import { NETWORK } from 'wallet/api/zeropool.api'

export const componentId = 'DemoHeader'
const bem = cn(componentId)

export type DemoHeaderProps = {
  publicBalance?: string
  privateBalance?: string
  tokenBalance?: string
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
    const address =
      (event.target as HTMLElement).id === 'Public' ? walletAddress : privateAddress

    copyToClipboard(address as string, 'Address', enqueueSnackbar)
  }

  const handleAmountClick = (event: MouseEvent<HTMLSpanElement>): void => {
    const amount = (event.target as HTMLElement).ariaLabel

    copyToClipboard(amount as string, 'Balance', enqueueSnackbar)
  }

  return (
    <div className={bem()} data-testid={bem()}>
      <div className={bem('Amounts')}>
        <div className={bem('Header')}>
          Public address:&nbsp;
          <Tooltip title={walletAddress || ''}>
            <span id="Public" onClick={handleAddressClick} style={{ cursor: 'pointer' }}>
              {beautifyAddress({ address: walletAddress || '' })}
            </span>
          </Tooltip>
        </div>

        {NETWORK !== 'near' ? (
          <div className={bem('Balance')}>
            Eth:&nbsp;
            <Tooltip title={publicBalance || ''}>
              {publicBalance === undefined ? (
                <CircularProgress className={bem('Progress')} color="inherit" />
              ) : (
                <span onClick={handleAmountClick} style={{ cursor: 'pointer' }}>
                  {beautifyAmount(publicBalance)}
                </span>
              )}
            </Tooltip>
          </div>
        ) : null}

        <div className={bem('Balance')}>
          Tokens:&nbsp;
          <Tooltip title={tokenBalance || ''}>
            {tokenBalance === undefined ? (
              <CircularProgress className={bem('Progress')} color="inherit" />
            ) : (
              <span onClick={handleAmountClick} style={{ cursor: 'pointer' }}>
                {beautifyAmount(tokenBalance)}
              </span>
            )}
          </Tooltip>
        </div>

        <div className={bem('Header')}>
          Private address:&nbsp;
          <Tooltip title={privateAddress || ''}>
            <span id="Private" onClick={handleAddressClick} style={{ cursor: 'pointer' }}>
              {beautifyAddress({ address: privateAddress || '' })}
            </span>
          </Tooltip>
        </div>

        <div className={bem('Balance')}>
          Tokens:&nbsp;
          <Tooltip title={privateBalance || ''}>
            {privateBalance === undefined ? (
              <CircularProgress className={bem('Progress')} color="inherit" />
            ) : (
              <span onClick={handleAmountClick} style={{ cursor: 'pointer' }}>
                {beautifyAmount(privateBalance)}
              </span>
            )}
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
