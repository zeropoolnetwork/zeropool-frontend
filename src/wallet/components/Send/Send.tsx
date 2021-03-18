import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import NumberFormat from 'react-number-format'
import { cn } from '@bem-react/classname'

import './Send.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { validateAddress } from 'shared/helpers/addres.helper'

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
  const [amount, setAmount] = useState('')
  const [amountValid, setAmountValid] = useState(true)
  const { enqueueSnackbar } = useSnackbar()

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  const handleAddressPaste = async (event: React.MouseEvent) => {
    const text = await navigator.clipboard.readText()

    if (validateAddress(text, wallet.token.symbol)) {
      setAddress(text)
      enqueueSnackbar('Address added from the clipboard', { variant: 'success' })
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
        <TextField
          className={css('AddressInput')}
          id="address"
          label="Address"
          value={address}
          onChange={handleAddressChange}
        />

        <span className={css('AddressInputPaste')} onClick={handleAddressPaste}>
          Paste
        </span>

        <TextField
          className={css('AmountInput', { Invalid: !amountValid })}
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
          className={css('NextButton')}
          data-testid={test('Next')}
          onClick={() => onNextClick(address, +amount)}
          color="primary"
          disabled={!(address && +amount > 0 && amountValid)}
          disableElevation={!(address && amount)}
          variant="contained"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
