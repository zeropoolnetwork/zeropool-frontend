import React from 'react';
import { render } from '@testing-library/react';

import { WellcomePage } from './WellcomePage';

describe('Wellcome Page', () => {
  it('renders greetengs', () => {

    const { getByText } = render(<WellcomePage />);
    const linkElement = getByText(/Wellcome to ZeroPool/i);
    expect(linkElement).toBeInTheDocument();
  })

  it('should render description', () => {
    const { getByText } = render(<WellcomePage />);
    const linkElement = getByText(/Please/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('should render Create button', () => {

  });

  it('should renter Import button', () => {

  });
});
