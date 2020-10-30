import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import { WellcomePage, componentId } from './WellcomePage';
import { mockAppState } from 'common/helpers/test/app-state.helper';

//#region Mocks
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;
const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  // useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('connected-react-router', () => ({
  push: () => jest.fn(),
}));
//#endregion

describe.only('Wellcome Page', () => {
  let getByTestId;
  afterEach(cleanup);

  beforeEach(() => {
    // useSelectorMock.mockImplementation(selectorFn => selectorFn(mockAppState));
    useDispatchMock.mockReturnValue(mockedDispatch);
  });

  it('should render component', () => {
    const { getByTestId } = render(<WellcomePage />);

    expect(getByTestId(componentId)).toBeInTheDocument();
  });

  it('should render greeteng', () => {
    const { getByTestId } = render(<WellcomePage />);

    expect(getByTestId(`${componentId}-Greeting`)).toBeInTheDocument();
  })

  it('should render description', () => {
    const { getByTestId } = render(<WellcomePage />);

    expect(getByTestId(`${componentId}-Description`)).toBeInTheDocument();
  });

  describe('Create button', () => {
    it('should render Create button', () => {
      const { getByTestId } = render(<WellcomePage />);

      expect(getByTestId(`${componentId}-CreateButton`)).toBeInTheDocument();
    });

    it('should dispatch router event when Create button clicked', () => {
      const { getByTestId } = render(<WellcomePage />);
      fireEvent.click(getByTestId(`${componentId}-CreateButton`));

      expect(mockedDispatch).toHaveBeenCalledTimes(1);
    });
  });

  it('should render Import button', () => {
    const { getByTestId } = render(<WellcomePage />);

    expect(getByTestId(`${componentId}-ImportButton`)).toBeInTheDocument();
  });

  it('should render About button', () => {
    const { getByTestId } = render(<WellcomePage />);

    expect(getByTestId(`${componentId}-AboutButton`)).toBeInTheDocument();
  });
});
