import React from 'react';
import { render } from '@testing-library/react';

import { componentId, StepTwo } from './StepTwo';

describe('StepTwo', () => {
  it('renders submit button', () => {
    const { getByTestId } = render(<StepTwo onSubmit={() => true} seed={['test']} />);

    expect(getByTestId(`${componentId}-SubmitButton`)).toBeInTheDocument();
  })
});
