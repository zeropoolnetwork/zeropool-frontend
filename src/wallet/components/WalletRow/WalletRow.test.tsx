import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { WalletRow, componentId, WalletRowProps } from './WalletRow';

const testToken = {name: 'testToken', symbol: 'Test', id: 1};
const testWallet = {account: 0, id: 0, name: 'testWallet', amount: 333, address: 'x123', token: testToken, private: false}

describe('WalletRow', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<WalletRowProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <WalletRow 
      rate={1}
      rollUp={0}
      token={testToken}
      wallet={testWallet}

      onEditClick={jest.fn()}
      onReceiveClick={jest.fn()}
      onSendClick={jest.fn()}
      onRollUpClick={jest.fn()}
    />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
