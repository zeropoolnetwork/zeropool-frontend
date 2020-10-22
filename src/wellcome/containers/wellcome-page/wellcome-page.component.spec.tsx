import React from 'react';
import { render } from '@testing-library/react';

import { WellcomePageComponent } from './wellcome-page.component';

describe('Wellcome Page', () =>
  test('renders greetengs', () => {
    const { getByText } = render(<WellcomePageComponent />);
    const linkElement = getByText(/Wellcome to ZeroPool/i);
    expect(linkElement).toBeInTheDocument();
  })
);
