import React, { useState } from 'react';
import { cn } from '@bem-react/classname';

import './Send.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

import { Wallet } from 'wallet/state/models/wallet';
import { TextField } from '@material-ui/core';

export const componentId = 'Send';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface SendProps { 
  wallet: Wallet,
  onNextClick: (address: string, amount: number) => void,
}

export const Send: React.FC<SendProps> = ({wallet, onNextClick}) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  }

  const handleAddressPaste = async (event: React.MouseEvent) => {
    const text = await navigator.clipboard.readText();
    setAddress(text);
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  }

  const handleAmountMaximise = (event: React.MouseEvent) => {
    setAmount(wallet.amount);
  }


  return (
    <div className={css()} data-testid={test()}>
      <div className={css('Title')}> 
        Send {wallet.address.symbol}
      </div>

      <form className={css('Inputs')} noValidate autoComplete="off">
        <TextField 
          className={css('AddressInput')} 
          id="address" 
          label="Address" 
          value={address} 
          onChange={handleAddressChange}
        />
        
        <span className={css('AddressInputPaste')} onClick={handleAddressPaste}>Paste</span>

        <TextField 
          className={css('AmountInput')} 
          id="amount" 
          label="Token amount" 
          value={amount} 
          onChange={handleAmountChange}
        />

        <span className={css('AmountInputMax')} onClick={handleAmountMaximise}>Max</span>
      </form>

      <div className={css('Next')}>
        <button className={css('NextButton')} onClick={() => onNextClick(address, amount)}>
          Next
        </button>
      </div>
    </div>
  )
};      