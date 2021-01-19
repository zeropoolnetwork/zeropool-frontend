import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { SendConfirmation, componentId, SendConfirmationProps } from './SendConfirmation';

describe('SendConfirmation', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<SendConfirmationProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <SendConfirmation />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
