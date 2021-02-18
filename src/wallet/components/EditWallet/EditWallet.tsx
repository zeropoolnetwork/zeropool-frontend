import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import { Button, TextField } from '@material-ui/core';

import './EditWallet.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

export const componentId = 'EditWallet';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export type EditWalletProps = {
  onRename: (name: string) => void
  onDelete: () => void
  onCancel: () => void
  walletName: string
 }

export const EditWallet: React.FC<EditWalletProps> = ({walletName, onRename, onDelete, onCancel}) => {
  const [newName, setNewName] = useState('');
  const minNameLength = 3;

  return (
    <div className={css()} data-testid={test()}>
      <p className={css('Name')}> {walletName} </p>

      <TextField 
        className={css('NewName')} 
        label={`New name (min. ${minNameLength} symbols)`} 
        value={newName} 
        onChange={(event) => {setNewName(event.target.value)}}
      />

      <Button 
        disabled={newName.length < minNameLength}
        className={css('Rename')} 
        data-testid={test('Rename')}
        onClick={() => onRename(newName)}
        color="primary"
        variant="contained"
      >
        Rename
      </Button>

      <Button 
        className={css('Delete')} 
        data-testid={test('Delete')}
        onClick={onDelete}
        color="primary"
        variant="contained"
      >
        Delete
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