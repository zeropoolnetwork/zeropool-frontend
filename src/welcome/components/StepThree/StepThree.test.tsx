import React from 'react';
import { render } from '@testing-library/react';

import { StepThree } from './StepThree';

describe('StepThree', () => {
  it('renders greetengs', () => {

    const { getByText } = render(<StepThree />);
    const linkElement = getByText(/StepThree/i);
    expect(linkElement).toBeInTheDocument();
  })
});
