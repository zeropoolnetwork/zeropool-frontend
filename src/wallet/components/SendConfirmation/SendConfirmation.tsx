import React from 'react'
import { cn } from '@bem-react/classname'
import { Button, TextField, Tooltip } from '@material-ui/core'

import './SendConfirmation.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { Wallet } from 'wallet/state/models/wallet'

export const componentId = 'SendConfirmation'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type SendConfirmationProps = {
  address: string
  amount: number
  fee: number
  rate: number
  wallet: Wallet
  onConfirmClick: () => void
}

export const SendConfirmation: React.FC<SendConfirmationProps> = ({
  address,
  amount,
  fee,
  rate,
  wallet,
  onConfirmClick,
}) => {
  return (
    <div className={css()} data-testid={test()}>
      <div className={css('Title')}>Confirm transaction</div>

      <form className={css('Inputs')} noValidate={true} autoComplete="off">
        <Tooltip title={wallet.name} placement="bottom">
          <TextField
            className={css('From')}
            id="from"
            label="From"
            value={wallet.name}
            disabled={true}
          />
        </Tooltip>

        <Tooltip title={address} placement="bottom">
          <TextField className={css('To')} id="to" label="To" value={address} disabled={true} />
        </Tooltip>

        <Tooltip title={amount} placement="bottom">
          <TextField
            className={css('Amount')}
            id="amount"
            label="Amount"
            value={`${amount} ${wallet.token.symbol}`}
            disabled={true}
          />
        </Tooltip>

        <TextField
          className={css('Fee')}
          id="fee"
          label="Network fee"
          value={`${fee} ${wallet.token.symbol} (${Math.round(rate * fee * 10000) / 10000} $)`}
          disabled={true}
        />
      </form>

      <div className={css('Confirm')}>
        <Button
          className={css('ConfirmButton')}
          data-testid={test('Confirm')}
          onClick={() => onConfirmClick()}
          color="primary"
          disableElevation={true}
          variant="contained"
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}
