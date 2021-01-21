import React from 'react';
import { cn } from '@bem-react/classname';

import './SendConfirmation.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { Wallet } from 'wallet/state/models/wallet';
import { TextField } from '@material-ui/core';

export const componentId = 'SendConfirmation';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export type SendConfirmationProps = { 
  address: string
  amount: number
  rate: number
  wallet: Wallet
  onConfirmClick: () => void
}

export const SendConfirmation: React.FC<SendConfirmationProps> = ({
  address,
  amount,
  rate,
  wallet,
  onConfirmClick,
}) => {

  return (
    <div className={css()} data-testid={test()}>
      <div className={css('Title')}> 
        Confirm transaction
      </div>

      <form className={css('Inputs')} noValidate autoComplete="off">
        <TextField 
          className={css('From')} 
          id="from" 
          label="From" 
          value={wallet.name} 
          disabled={true}
        />

        <TextField 
          className={css('To')} 
          id="to" 
          label="To" 
          value={address} 
          disabled={true}
        />
        
        <TextField 
          className={css('Fee')} 
          id="fee" 
          label="Network fee" 
          value={'0.22 ETH'} 
          disabled={true}
        />
      </form>

      <div className={css('Confirm')}>
        <button 
          className={css('ConfirmButton')} 
          data-testid={test('Confirm')}
          onClick={() => onConfirmClick()}
        >
          Confirm
        </button>
      </div>
    </div>
  )
};