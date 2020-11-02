import React from 'react';
import { render } from '@testing-library/react';

import { StepHeader } from './StepHeader';

describe('StepHeader', () => {
  it('renders greetengs', () => {

    const { getByText } = render(<StepHeader />);
    const linkElement = getByText(/StepHeader/i);
    expect(linkElement).toBeInTheDocument();
  })
});
