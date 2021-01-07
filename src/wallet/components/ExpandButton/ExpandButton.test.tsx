import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { ExpandButton, componentId, ExpendButtonProps } from './ExpandButton';

describe('ExpandButton', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<ExpendButtonProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <ExpandButton />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
