import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { EditWallet, componentId, EditWalletProps } from './EditWallet';

describe('EditWallet', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<EditWalletProps>;
  let testWalletName = 'TestWalletName';

  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <EditWallet 
      walletName={testWalletName}
      onCancel={jest.fn()}
      onDelete={jest.fn()}
      onRename={jest.fn()}
    />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })

  it('contains wallet name', () => {
    const { getByTestId, getByText } = render(component);

    expect(getByText(testWalletName)).toBeInTheDocument();
  });

});
