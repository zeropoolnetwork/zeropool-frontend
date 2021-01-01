import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { Token } from 'shared/models/token';

import { TokenRow, componentId, TokenRowProps } from './TokenRow';

describe('Token', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<TokenRowProps>;

  const token: Token = { name: 'Test', id: 1, symbol: 'TST' }

  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <TokenRow amount={1} token={token} rate={500} />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
