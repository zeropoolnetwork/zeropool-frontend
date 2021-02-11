import React from 'react';
import { cn } from '@bem-react/classname';
import { Tooltip } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import './Receive.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { Address } from 'shared/models/address';

export const componentId = 'Receive';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export type ReceiveProps = { 
  address: Address
  rate: number
}

export const Receive: React.FC<ReceiveProps> = ({address, rate}) => {
  const { enqueueSnackbar } = useSnackbar();
  const QRCode = require('qrcode.react');
  const handleCodeClick = (): void => {
    enqueueSnackbar('Address copied to the clipboard', { variant: 'success' });
  }
  
  return (
    <div className={css()} data-testid={test()}>
      <div className={css('Title')}> 
        Receive {address.symbol}
      </div>

      <Tooltip title={address.value} placement="bottom">
        <div className={css('Code')} onClick={handleCodeClick}>
            <QRCode value={address.value}/>
        </div>
      </Tooltip>
    </div>
  )
}; 