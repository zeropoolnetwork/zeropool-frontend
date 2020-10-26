import React from 'react';
import { render } from '@testing-library/react';

import { StepOne } from './StepOne';

describe('StepOne', () => {
  it('renders greetengs', () => {

    const { getByText } = render(<StepOne />);
    const linkElement = getByText(/StepOne/i);
    expect(linkElement).toBeInTheDocument();
  })
});
