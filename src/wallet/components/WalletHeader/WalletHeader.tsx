import React from 'react';
import { cn } from '@bem-react/classname';
import NumberFormat from 'react-number-format';
import { ArrowBack } from '@material-ui/icons';
import { Tooltip, Button } from '@material-ui/core';

import './WalletHeader.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

import { WalletView } from 'wallet/state/models/wallet-view';
import { WalletHeaderMode } from 'wallet/components/WalletHeader/WalletHeaderMode';

export const componentId = 'WalletHeader';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface WalletHeaderProps {
  tokenAmount?: number;
  fiatValue?: number;
  view: WalletView;
  label: string;
  mode: WalletHeaderMode;
  tokenRate?: number;
  tokenSymbol?: string;
  tokenName?:string;
  onBackClick: () => void;
}


export const WalletHeader: React.FC<WalletHeaderProps> = ({ mode, tokenAmount, label, view, fiatValue, tokenRate, tokenName, onBackClick }) => {
  return (
    <div className={css()} data-testid={test()}>
      {mode !== WalletHeaderMode.Balance ?
        <Tooltip title="Step back" placement="bottom">
          <Button
            className={css('BackButton')}
            data-testid={test('BackButton')}
            onClick={onBackClick}
            disableRipple
          >
            <ArrowBack className={css('Icon')} />
          </Button>
        </Tooltip>
        : null}

      <div className={css('Title')}>
        {label}
      </div>

      <div className={css('Amount')}>
        {[WalletView.About, WalletView.Help].includes(view) ? null : 
          <NumberFormat
            className={css('FiatAmount')}
            data-testid={test('FiatAmount')}
            value={fiatValue}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' $'}
            decimalScale={2}
          />
        }
      </div>
    </div>
  )
};