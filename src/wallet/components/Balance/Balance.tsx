import React from 'react';
import { cn } from '@bem-react/classname';
import NumberFormat from 'react-number-format';

import './Balance.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { Token as TokenModel } from 'shared/models/token';

import { Token } from 'wallet/components/Token/Token';

export const componentId = 'Balance';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface BalanceProps {
  amounts: Record<TokenModel['symbol'], number>;
  rates: Record<string, number>;
  tokens: string[];
  tokensRecord: Record<string, TokenModel>
}

export const Balance: React.FC<BalanceProps> = ({ amounts, rates, tokens, tokensRecord }) => {

  const getTotal = (): number =>
    tokens.reduce((accu, tokenSymbol) =>
      rates[tokenSymbol] * (amounts[tokenSymbol] || 0) + accu, 0)

  return (
    <div className={css()} data-testid={test()}>
      <h1 className={css('Total')} data-testid={test('Total')}>
        <NumberFormat value={getTotal()} displayType={'text'} thousandSeparator={true} suffix={' $'} decimalScale={2} />
      </h1>

      {tokens.map((tokenSymbol, index) => <Token amount={amounts[tokenSymbol]} token={tokensRecord[tokenSymbol]} rate={rates[tokenSymbol]} key={index} />)}
    </div>
  )
};