import React from 'react';
import { cn } from '@bem-react/classname';
import NumberFormat from 'react-number-format';

import './Token.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { Token as TokenModel } from 'shared/models/token';

export const componentId = 'Token';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface TokenProps {
  amount: number;
  rate: number;
  token: TokenModel;
}

export const Token: React.FC<TokenProps> = ({ amount = 0, token, rate }) => {

  return (
    <div className={css()} data-testid={test()}>
      <div className={css('Rates')}>
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