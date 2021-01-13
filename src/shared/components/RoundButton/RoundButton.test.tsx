import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { RoundButton, componentId, RoundButtonProps } from './RoundButton';

describe('RoundButton', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<RoundButtonProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <RoundButton>test</RoundButton>;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
