import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { Send, componentId, SendProps } from './Send';

describe('Send', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<SendProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <Send />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
