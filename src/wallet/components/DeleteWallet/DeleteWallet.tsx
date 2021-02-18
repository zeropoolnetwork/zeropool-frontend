import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { cn } from '@bem-react/classname';

import './DeleteWallet.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

export const componentId = 'DeleteWallet';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export type DeleteWalletProps = { 
  onDelete: () => void
  onCancel: () => void
  walletName: string
}

export const DeleteWallet: React.FC<DeleteWalletProps> = ({walletName, onCancel, onDelete}) => {
  const [confirmName, setConfirmName] = useState('');

  return (
    <div className={css()} data-testid={test()}>
      <p className={css('Name')}> {walletName} </p>

      <TextField 
        className={css('Confirm')} 
        label="Enter wallet name to confirm" 
        value={confirmName} 
        onChange={(event) => {setConfirmName(event.target.value)}}
      />
      
      <Button 
        className={css('Delete')} 
        data-testid={test('Delete')}
        disabled={confirmName !== walletName}
        onClick={() => onDelete()}
        color="primary"
        variant="contained"
      >
        Delete anyway
      </Button>

      <Button 
        className={css('Cancel')} 
        data-testid={test('Cancel')}
        onClick={onCancel}
        color="primary"
        variant="contained"
      >
        Cancel
      </Button>
    </div>
  )
};