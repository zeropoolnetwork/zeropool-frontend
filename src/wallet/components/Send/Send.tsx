import { Button, TextField, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import NumberFormat from 'react-number-format'
import { cn } from '@bem-react/classname'

import './Send.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { validateAddress } from 'shared/helpers/address.helper'
import logo from 'assets/images/logo_black.png'

import * as api from 'wallet/api/zeropool.api'
import { Wallet } from 'wallet/state/models/wallet'

export const componentId = 'Send'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type SendProps = {
  rate: number
  wallet: Wallet
  onNextClick: (address: string, amount: number) => void
}

export const Send: React.FC<SendProps> = ({ rate, wallet, onNextClick }) => {
  const [address, setAddress] = useState('')
  const [addressValid, setAddressValid] = useState(false)
  const [amount, setAmount] = useState('')
  const [amountValid, setAmountValid] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
    setAddressValid(validateAddress(event.target.value, wallet.token.symbol) || false)
  }

  const handleAddressPaste = async (event: React.MouseEvent) => {
    const text = await navigator.clipboard.readText()

    if (validateAddress(text, wallet.token.symbol)) {
      setAddress(text)
      setAddressValid(true)
      enqueueSnackbar('Address added from the clipboard', {
        variant: 'success',
      })
    } else {
      enqueueSnackbar('Clipboard contains bad address', { variant: 'error' })
    }
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d+(\.\d{1,9})?$/.test(event.target.value)) {
      setAmount(event.target.value)
      setAmountValid(Number(event.target.value) > 0)
    } else {
      setAmount(event.target.value)
      setAmountValid(false)
    }
  }

  const handleAmountMaximise = (event: React.MouseEvent) => {
    setAmount(wallet.amount.toString())
  }

  return (
    <div className={css()} data-testid={test()}>
      <div className={css('Title')}>Send {wallet.token.symbol}</div>

      <form className={css('Inputs')} noValidate={true} autoComplete="off">
        {address && api.addressShielded(address, wallet.token.symbol) ? (
          <Tooltip title="You going to transfer to private address" placement="bottom">
            <img src={logo} className={css('Logo')} data-testid={test('Logo')} />
          </Tooltip>
        ) : null}

        <TextField
          data-testid={test('AddressInputRoot')}
          inputProps={{ 'data-testid': test('AddressInput') }}
          className={css('AddressInput', { Invalid: address && !addressValid })}
          id="address"
          label="Address"
          value={address}
          onChange={handleAddressChange}
        />

        <span className={css('AddressInputPaste')} onClick={handleAddressPaste}>
          Paste
        </span>

        <TextField
          data-testid={test('AmountInputRoot')}
          className={css('AmountInput', { Invalid: amount && !amountValid })}
          inputProps={{ 'data-testid': test('AmountInput') }}
          id="amount"
          label="Token amount"
          value={amount}
          onChange={handleAmountChange}
        />

        <span className={css('AmountInputMax')} onClick={handleAmountMaximise}>
          Max
        </span>

        <NumberFormat
          className={css('FiatAmount')}
          data-testid={test('FiatAmount')}
          value={+amount * rate || 0}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'(= '}
          suffix={' $)'}
          decimalScale={2}
        />
      </form>

      <div className={css('Next')}>
        <Button
          className={css(`NextButton ${addressValid} ${amountValid}`)}
          data-testid={test('NextButton')}
          onClick={() => onNextClick(address, +amount)}
          color="primary"
          disabled={!addressValid || !amountValid}
          disableElevation={!address || !amount}
          variant="contained"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
