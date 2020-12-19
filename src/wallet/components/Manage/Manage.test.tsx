import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { Manage, componentId, ManageProps } from './Manage';

describe('Manage', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<ManageProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <Manage />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
