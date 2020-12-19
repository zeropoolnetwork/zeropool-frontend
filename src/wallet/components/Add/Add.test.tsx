import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { Add, componentId, AddProps } from './Add';

describe('Add', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<AddProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <Add />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
