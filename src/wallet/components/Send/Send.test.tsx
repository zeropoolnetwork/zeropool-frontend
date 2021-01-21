import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { Send, componentId, SendProps } from './Send';

import { _testWalletsEth } from 'shared/helpers/test/app-state.helper';

describe('Send', () => {
  let outputSpy = jest.fn();
  let component: React.ReactElement<SendProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <Send 
      rate={123}
      wallet={_testWalletsEth[0]} 
      onNextClick={outputSpy}
    />;
  });

  it('renders component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })

  it('calls onNextClick() prop when Next button clicked', () => {
    const { getByTestId } = render(component);
    fireEvent.click(getByTestId(componentId + '-Next'));

    expect(outputSpy).toHaveBeenCalledTimes(1);
  });
});
