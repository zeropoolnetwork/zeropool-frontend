import React from 'react';
import notistack from 'notistack';
import { cleanup, render } from '@testing-library/react';

import { Receive, componentId, ReceiveProps } from './Receive';

import { _testAddress, _testToken } from 'shared/helpers/test/app-state.helper';


const enqueueSnackbar = jest.fn();
jest.mock('notistack', () => ({
  useSnackbar: jest.fn()
}));
// @ts-ignore
jest.spyOn(notistack, 'useSnackbar').mockImplementation(() => {
  return {enqueueSnackbar}
});

describe('Receive', () => {
  let component: React.ReactElement<ReceiveProps>;
  afterEach(cleanup);

  beforeEach(() => {
    component = <Receive 
      address={_testAddress}
      rate={10}
      token={_testToken}
    />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
