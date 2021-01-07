import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { WalletRow, componentId, WalletRowProps } from './WalletRow';

const testToken = {name: 'testToken', symbol: 'Test', id: 1};
const testWallet = {name: 'testWallet', amount: 333, address: {symbol: 'Test', value: 'x123', private: false}}

describe('WalletRow', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<WalletRowProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <WalletRow 
      rate={1}
      token={testToken}
      wallet={testWallet}

      onEditClick={jest.fn()}
      onReceiveClick={jest.fn()}
      onSendClick={jest.fn()}
      onExpandClick={jest.fn()}
    />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
