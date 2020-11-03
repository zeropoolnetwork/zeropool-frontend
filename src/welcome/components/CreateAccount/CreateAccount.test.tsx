import React from 'react';
import { render } from '@testing-library/react';

import { CreateAccount } from './CreateAccount';

describe('CreateAccount', () => {
  it('renders greetengs', () => {

    const { getByText } = render(<CreateAccount />);
    const linkElement = getByText(/CreateAccount/i);
    expect(linkElement).toBeInTheDocument();
  })
});
