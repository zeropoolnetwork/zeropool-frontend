import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { Send, componentId, SendProps } from './Send';
import { _testWalletsEth } from 'shared/helpers/test/app-state.helper';

describe('Send', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<SendProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <Send wallet={_testWalletsEth[0]} onNextClick={jest.fn()}/>;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
