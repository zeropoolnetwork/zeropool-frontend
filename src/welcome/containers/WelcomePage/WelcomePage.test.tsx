import React from 'react';
import { render } from '@testing-library/react';

import { WelcomePage } from './WelcomePage';

describe('Welcome Page', () => {
  it('renders greetengs', () => {

    const { getByText } = render(<WelcomePage />);
    const linkElement = getByText(/Welcome to ZeroPool/i);
    expect(linkElement).toBeInTheDocument();
  })

  it('should render description', () => {
    const { getByText } = render(<WelcomePage />);
    const linkElement = getByText(/Please/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('should render Create button', () => {

  });

  it('should renter Import button', () => {

  });
});
