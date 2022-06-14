import React from 'react'
import { cn } from '@bem-react/classname'
import NumberFormat from 'react-number-format'
import { ArrowBack } from '@mui/icons-material'
import { Tooltip, Button } from '@mui/material'

import './WalletHeader.scss'

import { useNavigateBack } from 'shared/hooks/use-navigate-back'
import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'

import { WalletHeaderMode } from 'wallet/components/WalletHeader/WalletHeaderMode'

export const componentId = 'WalletHeader'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type WalletHeaderProps = {
  fiatValue?: number
  hideBackButton?: boolean
  label: string
  mode: WalletHeaderMode
  priv?: boolean
  publicBalance?: number
  tokenName?: string
  tokenSymbol?: string
  tokenRate?: number

  onBackClick: () => void
}

export const WalletHeader: React.FC<WalletHeaderProps> = ({
  mode,
  publicBalance,
  tokenSymbol,
  label,
  fiatValue,
  hideBackButton,
  priv,
  tokenName,
  onBackClick,
}) => {
  useNavigateBack(onBackClick)

  return (
    <div className={css()} data-testid={test()}>
      {!hideBackButton ? (
        <Tooltip title="Step back" placement="bottom">
          <Button
            className={css('BackButton')}
            data-testid={test('BackButton')}
            onClick={onBackClick}
            disableRipple={true}
            sx={{ padding: 0 }}
          >
            <ArrowBack className={css('Icon')} />
          </Button>
        </Tooltip>
      ) : null}

      <div className={css('Title', { Private: priv })}>
        <span>{label}</span>
      </div>

      <div className={css('Amount')}>
        {mode === WalletHeaderMode.Info ? null : (
          <NumberFormat
            className={css('FiatAmount')}
            data-testid={test('FiatAmount')}
            value={fiatValue}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' $'}
            decimalScale={2}
          />
        )}
      </div>

      <div className={css('Tokens')}>
        {publicBalance && tokenName ? `${publicBalance} ${tokenSymbol}` : null}
      </div>
    </div>
  )
}
