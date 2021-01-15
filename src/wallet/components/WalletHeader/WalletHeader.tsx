import React from 'react';
import { cn } from '@bem-react/classname';
import NumberFormat from 'react-number-format';
import { ArrowBack } from '@material-ui/icons';
import { Tooltip, Button } from '@material-ui/core';

import './WalletHeader.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

import { WalletHeaderMode } from 'wallet/components/WalletHeader/WalletHeaderMode';

export const componentId = 'WalletHeader';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export type WalletHeaderProps = {
  fiatValue?: number
  hideBackButton?: boolean
  label: string
  mode: WalletHeaderMode
  tokenAmount?: number
  tokenName?:string
  tokenSymbol?: string

  onBackClick: () => void
}

export const WalletHeader: React.FC<WalletHeaderProps> = ({ mode, tokenAmount, label, fiatValue, hideBackButton, tokenName, onBackClick }) => {
  return (
    <div className={css()} data-testid={test()}>
      {!hideBackButton ?
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
        {mode === WalletHeaderMode.Info ? null : 
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
