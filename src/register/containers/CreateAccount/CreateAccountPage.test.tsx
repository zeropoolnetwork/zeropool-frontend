import React from 'react';
import { push } from 'connected-react-router';
import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import { CreateAccountPage, componentId } from './CreateAccountPage';
import { mockAppState } from 'common/helpers/test/app-state.helper';

//#region Mocks
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;
const pushMock = push as jest.Mock;
const dispatchSpy = jest.fn();
const pushSpy = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('connected-react-router', () => ({
  push: jest.fn(),
}));
//#endregion


describe('CreateAccountPage', () => {
  beforeEach(() => {
    useSelectorMock.mockImplementation(selectorFn => selectorFn(mockAppState));
    useDispatchMock.mockReturnValue(dispatchSpy);
    pushMock.mockImplementation(pushSpy);
  });
  it('renders', () => {

    const { getByTestId } = render(<CreateAccountPage />);
    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
