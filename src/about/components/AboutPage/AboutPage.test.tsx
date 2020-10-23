import React from 'react';
import { render } from '@testing-library/react';

import { AboutPage } from './AboutPage';

describe('AboutPage', () => {
  it('renders greetengs', () => {

    const { getByText } = render(<AboutPage />);
    const linkElement = getByText(/AboutPage/i);
    expect(linkElement).toBeInTheDocument();
  })
});
