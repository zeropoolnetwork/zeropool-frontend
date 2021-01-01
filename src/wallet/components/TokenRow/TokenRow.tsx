import React from 'react';
import { cn } from '@bem-react/classname';
import NumberFormat from 'react-number-format';

import './TokenRow.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { IconOption } from 'shared/components/Icon/IconOption';
import { Token } from 'shared/models/token';
import { Icon } from 'shared/components/Icon/Icon';

export const componentId = 'Token';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface TokenRowProps {
  amount: number;
  rate: number;
  token: Token;
}

export const TokenRow: React.FC<TokenRowProps> = ({ amount = 0, token, rate }) => {

  return (
    <div className={css()} data-testid={test()}>
      <div className={css('Rates')}>
        <Icon icon={token.symbol as IconOption} />
        
        <span className={css('Name')}>{token.name}</span>

        <NumberFormat
          className={css('Rate')}
          data-testid={test('Rate')}
          value={rate}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' $'}
          decimalScale={2}
        />
      </div>

      <div className={css('Amounts')}>
        <NumberFormat
          className={css('TokenAmount')}
          data-testid={test('TokenAmount')}
          value={amount}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' ' + token.symbol}
          decimalScale={6}
        />

        <NumberFormat
          className={css('FiatAmount')}
          data-testid={test('FiatAmount')}
          value={amount * rate}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' $'}
          decimalScale={2}
        />
      </div>
    </div>
  )
};