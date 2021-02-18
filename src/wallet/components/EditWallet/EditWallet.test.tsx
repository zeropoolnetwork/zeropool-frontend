import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { EditWallet, componentId, EditWalletProps } from './EditWallet';

describe('EditWallet', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<EditWalletProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <EditWallet />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
