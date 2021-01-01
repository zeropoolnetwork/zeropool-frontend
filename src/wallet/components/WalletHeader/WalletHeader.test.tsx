import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { WalletHeader, componentId, WalletHeaderProps } from './WalletHeader';

import { WalletView } from 'wallet/state/models/wallet-view';

describe('WalletHeader', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<WalletHeaderProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <WalletHeader
      view={WalletView.Wallets}
      tokenAmount={5}
      tokenRate={750}
      tokenSymbol={'ETH'}
      fiatValue={3250.43}
      onBackClick={jest.fn()} />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
