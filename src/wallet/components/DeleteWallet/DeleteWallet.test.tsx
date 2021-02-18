import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { DeleteWallet, componentId, DeleteWalletProps } from './DeleteWallet';

describe('DeleteWallet', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<DeleteWalletProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <DeleteWallet />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
