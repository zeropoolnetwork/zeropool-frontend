import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { Address, componentId, AddressProps } from './Address';

describe('Address', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<AddressProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <Address />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
