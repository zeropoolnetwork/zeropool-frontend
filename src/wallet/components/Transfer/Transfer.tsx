import { Button, CircularProgress, FormControl, FormControlLabel, FormGroup, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import { TransferData, TransferType } from 'shared/models'
import { Close, CopyAll } from '@mui/icons-material'
import { cn } from '@bem-react/classname'

import './Transfer.scss'
import { ZPSwitch } from 'shared/components/ZPSwitch/zpswitch'
import { useSnackbar } from 'notistack'
import { copyFromClipboard } from 'shared/utils/copy-from-clipboard'
import { LoadingButton } from '@mui/lab'
import { transfer } from 'wallet/api/zeropool.api'
import { badAmount } from 'shared/utils/bad-amount'


export const componentId = 'Transfer'

const bem = cn(componentId)

export type TransferProps = {
  onChange: (type: TransferType, amount: string) => void
  onSubmit: (transfer: TransferData) => void
  onCancel: () => void
  processing: boolean
  canTransfer: boolean
  balanceError: boolean
}

export const Transfer: React.FC<TransferProps> = ({
  onChange,
  onSubmit,
  onCancel,
  processing,
  canTransfer,
  balanceError,
}) => {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [fromPrivate, setFromPrivate] = useState(true)
  const [toPrivate, setToPrivate] = useState(true)
  const [funds, setFunds] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const getType = (): TransferType => {
    if (funds) { return 'funds' }
    else if (fromPrivate) { return toPrivate ? 'privateToPrivate' : 'privateToPublic' }
    else { return toPrivate ? 'publicToPrivate' : 'publicToPublic' }
  }

  const transferData = (): TransferData => ({
    to,
    amount,
    id: Date.now(),
    type: getType(),
  })

  return (
    <FormGroup className={bem()} data-testid={bem()}>
      <p className={bem('Name')}>Transfer</p>

      <div className={bem('Switches')}>
        <FormControlLabel
          className={bem('Switch')}
          labelPlacement="top"
          control={<ZPSwitch sx={{ m: 1 }} defaultChecked={true} />}
          label={`${funds ? 'funds' : 'tokens'}`}
          onChange={(event, checked) => {
            setFunds(!checked)
            setFromPrivate(checked)
            setToPrivate(checked)
            onChange(getType(), amount)
          }}
        />

        <FormControlLabel
          className={bem('Switch')}
          labelPlacement="top"
          disabled={funds}
          control={<ZPSwitch sx={{ m: 1 }} />}
          label={`from ${fromPrivate ? 'private' : 'public'}`}
          onChange={(event, checked) => { setFromPrivate(checked); onChange(getType(), amount) }}
          checked={fromPrivate}
        />

        <FormControlLabel
          className={bem('Switch')}
          labelPlacement="top"
          disabled={funds}
          control={<ZPSwitch sx={{ m: 1 }} />}
          label={`to ${toPrivate ? 'private' : 'public'}`}
          onChange={(event, checked) => { setToPrivate(checked); onChange(getType(), amount) }}
          checked={toPrivate}
        />
      </div>

      <FormControl className={bem('FormControl')}>
        <InputLabel className={bem('FormControlLabel')} htmlFor="to">
          Destination address
        </InputLabel>

        <Input
          id="to"
          className={bem('Input')}
          value={to}
          type={'text'}
          onChange={(event) => setTo(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                tabIndex={-1}
                className={bem('FormControlButton', { Hidden: !to })}
                aria-label="empty confirmation"
                onClick={() => setTo('')}
                onMouseDown={(event) => event.preventDefault()}
              >
                <Close />
              </IconButton>

              <IconButton
                tabIndex={-1}
                className={bem('FormControlButton')}
                aria-label="paste"
                onClick={() => copyFromClipboard('Address', enqueueSnackbar, text => setTo(text))}
              >
                <CopyAll />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl className={bem('FormControl')}>
        <InputLabel className={bem('FormControlLabel')} htmlFor="amount">
          Amount
        </InputLabel>

        <Input
          id="amount"
          className={bem('Input')}
          value={amount}
          type={'text'}
          onChange={(event) => { setAmount(event.target.value); onChange(getType(), event.target.value) }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                tabIndex={-1}
                className={bem('FormControlButton', { Hidden: !amount })}
                aria-label="empty confirmation"
                onClick={() => setAmount('')}
                onMouseDown={(event) => event.preventDefault()}
              >
                <Close />
              </IconButton>

              <IconButton
                tabIndex={-1}
                className={bem('FormControlButton')}
                aria-label="paste"
                onClick={() => copyFromClipboard('Amount', enqueueSnackbar, text => setAmount(text))}
              >
                <CopyAll />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <div className={bem('Buttons')}>
        <Button
          disabled={!canTransfer || badAmount(amount) || !to || balanceError}
          className={bem('Button')}
          data-testid={bem('Submit')}
          onClick={() => onSubmit(transferData())}
          color="primary"
          variant="contained"
        >
          {processing ? <CircularProgress color="inherit" size={25} /> : 'Submit'}
        </Button>

        <Button
          className={bem('Button')}
          data-testid={bem('Cancel')}
          onClick={onCancel}
          color="primary"
          variant="contained"
        >
          Close
        </Button>
      </div>
    </FormGroup>
  )
}
