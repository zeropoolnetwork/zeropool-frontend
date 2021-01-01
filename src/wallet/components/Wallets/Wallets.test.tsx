import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { Wallets, componentId, WalletsProps } from './Wallets';

describe('Wallets', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<WalletsProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <Wallets />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
