import React from 'react';
import { render } from '@testing-library/react';

import { StepTwo } from './StepTwo';

describe('StepTwo', () => {
  it('renders greetengs', () => {

    const { getByText } = render(<StepTwo />);
    const linkElement = getByText(/StepTwo/i);
    expect(linkElement).toBeInTheDocument();
  })
});
