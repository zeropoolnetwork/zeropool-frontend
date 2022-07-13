import { Button, FormControl, FormControlLabel, FormGroup, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import { TransferData, TransferType } from 'shared/models'
import { Close, CopyAll } from '@mui/icons-material'
import { cn } from '@bem-react/classname'

import './Transfer.scss'
import { ZPSwitch } from 'shared/components/ZPSwitch/zpswitch'
import { useSnackbar } from 'notistack'
import { copyFromClipboard } from 'shared/utils/copy-from-clipboard'


export const componentId = 'Transfer'

const bem = cn(componentId)

export type TransferProps = {
  onSubmit: (transfer: TransferData) => void
  onCancel: () => void
  processing: boolean
  canTransfer: boolean
}

export const Transfer: React.FC<TransferProps> = ({
  onSubmit,
  onCancel,
  processing,
  canTransfer,
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
          }}
        />

        <FormControlLabel
          className={bem('Switch')}
          labelPlacement="top"
          disabled={funds}
          control={<ZPSwitch sx={{ m: 1 }} />}
          label={`from ${fromPrivate ? 'private' : 'public'}`}
          onChange={(event, checked) => setFromPrivate(checked)}
          checked={fromPrivate}
        />

        <FormControlLabel
          className={bem('Switch')}
          labelPlacement="top"
          disabled={funds}
          control={<ZPSwitch sx={{ m: 1 }} />}
          label={`to ${toPrivate ? 'private' : 'public'}`}
          onChange={(event, checked) => setToPrivate(checked)}
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
                className={bem('FormControlButton', { Hidden: !to })}
                aria-label="empty confirmation"
                onClick={() => setTo('')}
                onMouseDown={(event) => event.preventDefault()}
              >
                <Close />
              </IconButton>

              <IconButton
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
          onChange={(event) => setAmount(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                className={bem('FormControlButton', { Hidden: !amount })}
                aria-label="empty confirmation"
                onClick={() => setAmount('')}
                onMouseDown={(event) => event.preventDefault()}
              >
                <Close />
              </IconButton>

              <IconButton
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
          disabled={!canTransfer}
          className={bem('Button')}
          data-testid={bem('Submit')}
          onClick={() => onSubmit(transferData())}
          color="primary"
          variant="contained"
        >
          Submit
        </Button>

        <Button
          className={bem('Button')}
          data-testid={bem('Cancel')}
          onClick={onCancel}
          color="primary"
          variant="contained"
          disabled={processing}
        >
          Cancel
        </Button>
      </div>
    </FormGroup>
  )
}
