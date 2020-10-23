import React from 'react';
import { render } from '@testing-library/react';

import { WellcomePageComponent } from './WellcomePage';

describe('Wellcome Page', () => {
  it('renders greetengs', () => {

    const { getByText } = render(<WellcomePageComponent />);
    const linkElement = getByText(/Wellcome to ZeroPool/i);
    expect(linkElement).toBeInTheDocument();
  })

  it('should render description', () => {
    const { getByText } = render(<WellcomePageComponent />);
    const linkElement = getByText(/Please create/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('should render Create button', () => {

  });

  it('should renter Import button', () => {

  });
});
