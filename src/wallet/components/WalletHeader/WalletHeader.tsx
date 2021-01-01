import React from 'react';
import { cn } from '@bem-react/classname';

import './WalletHeader.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { Tooltip, Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { WalletView } from 'wallet/state/models/wallet-view';
import NumberFormat from 'react-number-format';

export const componentId = 'WalletHeader';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface WalletHeaderProps {
  tokenAmount?: number;
  fiatValue: number;
  view: WalletView;
  tokenRate?: number;
  tokenSymbol?: string;
  onBackClick: () => void;
}


export const WalletHeader: React.FC<WalletHeaderProps> = ({ tokenAmount, view, fiatValue, tokenRate, tokenSymbol, onBackClick }) => {

  return (
    <div className={css()} data-testid={test()}>
      {view !== WalletView.Balance ?
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
        {[WalletView.Balance, WalletView.Wallets].includes(view) ?
          headerLabel[view]()
          : null}
      </div>

      <div className={css('Amount')}>
        <NumberFormat
          className={css('FiatAmount')}
          data-testid={test('FiatAmount')}
          value={fiatValue}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' $'}
          decimalScale={2}
        />
      </div>

    </div>
  )
};

export const headerLabel: Record<WalletView, (name?: string) => string> = {
  [WalletView.Balance]: () => ('Overall balance'),
  [WalletView.Wallets]: (name) => (`${name} wallets`),
  [WalletView.Address]: () => '',
  [WalletView.About]: () => 'About',
  [WalletView.Help]: () => 'Help',
};
