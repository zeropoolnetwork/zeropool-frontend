import React from 'react';
import { render } from '@testing-library/react';

import { WalletPage } from './WalletPage';

describe('WalletPage', () => {
  it('renders greetengs', () => {

    const { getByText } = render(<WalletPage />);
    const linkElement = getByText(/WalletPage/i);
    expect(linkElement).toBeInTheDocument();
  })
});
