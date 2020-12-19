import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { Token as TokenModel } from 'shared/models/token';

import { Token, componentId, TokenProps } from './Token';

describe('Token', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<TokenProps>;

  const token: TokenModel = { name: 'Test', id: 1, symbol: 'TST' }

  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <Token amount={1} token={token} rate={500} />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
