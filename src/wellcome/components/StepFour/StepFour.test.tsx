import React from 'react';
import { useDispatch } from 'react-redux';
import { render, cleanup } from '@testing-library/react';

import { StepFour, componentId } from './StepFour';

const mockUseDispatch = useDispatch as jest.Mock;
const mockedDispatch = jest.fn();

describe('StepFour', () => {
  afterEach(cleanup);

  beforeEach(() => {
    mockUseDispatch.mockReturnValue(mockedDispatch);
  });

  it('should render component', () => {
    const { getByTestId } = render(<StepFour></StepFour>);

    expect(getByTestId(componentId)).toBeInTheDocument();
  });

  it('should renders greeteng', () => {

    const { getByText } = render(<StepFour />);
    const linkElement = getByText(/StepFour/i);
    expect(linkElement).toBeInTheDocument();
  })
});
