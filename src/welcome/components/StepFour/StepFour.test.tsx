import React from 'react';
import { render } from '@testing-library/react';

import { StepFour } from './StepFour';

describe('StepFour', () => {
  it('renders greetengs', () => {

    const { getByText } = render(<StepFour />);
    const linkElement = getByText(/StepFour/i);
    expect(linkElement).toBeInTheDocument();
  })
});
