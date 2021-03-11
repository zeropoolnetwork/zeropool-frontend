import React from 'react';
import { cn } from '@bem-react/classname';
import { Tooltip } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import './Receive.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { Token } from 'shared/models';

export const componentId = 'Receive';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export type ReceiveProps = { 
  address: string
  rate: number
  token: Token
}

export const Receive: React.FC<ReceiveProps> = ({address, rate, token}) => {
  const { enqueueSnackbar } = useSnackbar();
  const QRCode = require('qrcode.react');
  const handleCodeClick = (): void => {
    navigator.clipboard.writeText(address).then(() => {
      enqueueSnackbar('Address copied to the clipboard', { variant: 'success' });
    }, (err) => {
      enqueueSnackbar(`Can't access clipboard`, { variant: 'error' });
    });
  };
  
  return (
    <div className={css()} data-testid={test()}>
      <div className={css('Title')}> 
        Receive {token.symbol}
      </div>

      <Tooltip title={address} placement="bottom">
        <div className={css('Code')} onClick={handleCodeClick}>
            <QRCode value={address}/>
        </div>
      </Tooltip>
    </div>
  )
}; 