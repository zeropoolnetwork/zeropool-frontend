import React from 'react';
import notistack from 'notistack';
import { render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';

import { componentId, WalletPage } from './WalletPage';

import { mockAppState } from 'shared/helpers/test/app-state.helper';

//#region Mocks
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;
const dispatchSpy = jest.fn();
const enqueueSnackbar = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('notistack', () => ({
  useSnackbar: jest.fn()
}));
// @ts-ignore
jest.spyOn(notistack, 'useSnackbar').mockImplementation(() => {
  return {enqueueSnackbar}
});

describe('WalletPage', () => {
  beforeEach(() => {
    useSelectorMock.mockImplementation(selectorFn => selectorFn(mockAppState));
    useDispatchMock.mockReturnValue(dispatchSpy);
  });

  it('WalletPage', () => {
    const { getByTestId } = render(<WalletPage />);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
