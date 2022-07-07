import { Button, FormControl, FormControlLabel, FormGroup, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import { TransferData, TransferType } from 'shared/models'
import { Close, CopyAll } from '@mui/icons-material'
import { cn } from '@bem-react/classname'

import './Transfer.scss'
import { ZPSwitch } from 'shared/components/ZPSwitch/zpswitch'


export const componentId = 'Transfer'

const bem = cn(componentId)

export type TransferProps = {
  publicAddress: string
  privateAddress: string
  onSubmit: (transfer: TransferData) => void
  onCancel: () => void
}

export const Transfer: React.FC<TransferProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [type, setType] = useState<TransferType>('publicToPublic')
  const [fromPrivate, setFromPrivate] = useState(false)
  const [toPrivate, setToPrivate] = useState(false)

  const transferData = (): TransferData => ({
    from,
    to,
    amount,
    id: Date.now(),
    type,
  })

  return (
    <FormGroup className={bem()} data-testid={bem()}>
      <p className={bem('Name')}>Transfer</p>

      <div className={bem('Switches')}>
        <FormControlLabel
          labelPlacement="top"
          control={<ZPSwitch sx={{ m: 1 }} defaultChecked={false} />}
          label={`From: ${fromPrivate ? 'Private' : 'Public'}`}
          onChange={() => setFromPrivate(!fromPrivate)}
        />

        <FormControlLabel
          labelPlacement="top"
          control={<ZPSwitch sx={{ m: 1 }} defaultChecked={false} />}
          label={`To: ${toPrivate ? 'Private' : 'Public'}`}
          onChange={() => setToPrivate(!toPrivate)}
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
                className={bem('FormControlButton', {Hidden: !to})}
                aria-label="empty confirmation"
                onClick={() => setTo('')}
                onMouseDown={(event) => event.preventDefault()}
              >
                <Close />
              </IconButton>

              <IconButton
                className={bem('FormControlButton')}
                aria-label="paste"
                onClick={() => {alert('Not implemented')}}
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
                className={bem('FormControlButton', {Hidden: !amount})}
                aria-label="empty confirmation"
                onClick={() => setAmount('')}
                onMouseDown={(event) => event.preventDefault()}
              >
                <Close />
              </IconButton>

              <IconButton
                className={bem('FormControlButton')}
                aria-label="paste"
                onClick={() => {alert('Not implemented')}}
              >
                <CopyAll />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <div className={bem('Buttons')}>
        <Button
          disabled={!!error}
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
        >
          Cancel
        </Button>
      </div>
    </FormGroup>
  )
}
