import React from 'react';
import { cn } from '@bem-react/classname';

import './Balance.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { Token, TokenSymbol } from 'shared/models/token';

import { TokenRow } from 'wallet/components/TokenRow/TokenRow';

export const componentId = 'Balance';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface BalanceProps {
  amounts: Record<TokenSymbol, number>;
  onSelectToken: (token: Token) => void;
  rates: Record<string, number>;
  tokens: string[];
  tokensRecord: Record<string, Token>
}

export const Balance: React.FC<BalanceProps> = ({ amounts, rates, tokens, tokensRecord, onSelectToken }) => {
  return (
    <div className={css()} data-testid={test()}>
      {tokens.map((tokenSymbol, index) =>
        <TokenRow
          onSelectToken={onSelectToken}
          amount={amounts[tokenSymbol]}
          token={tokensRecord[tokenSymbol]}
          rate={rates[tokenSymbol]}
          key={index}
        />
      )}
    </div>
  )
};