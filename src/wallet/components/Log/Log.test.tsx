import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { Log, componentId, LogProps } from './Log';

describe('Log', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<LogProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <Log />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
