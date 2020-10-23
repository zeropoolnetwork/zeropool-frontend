import React from 'react';
import { render } from '@testing-library/react';

import { TemplateName } from './TemplateName';

describe('TemplateName', () => {
  it('renders greetengs', () => {

    const { getByText } = render(<TemplateName />);
    const linkElement = getByText(/TemplateName/i);
    expect(linkElement).toBeInTheDocument();
  })
});
