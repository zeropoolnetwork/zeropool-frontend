import React from 'react';
import { render } from '@testing-library/react';

import { ImportAccount } from './ImportAccount';

describe('ImportAccount', () => {
  it('renders greetengs', () => {

    const { getByText } = render(<ImportAccount />);
    const linkElement = getByText(/ImportAccount/i);
    expect(linkElement).toBeInTheDocument();
  })
});
