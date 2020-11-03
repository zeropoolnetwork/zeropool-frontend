import React, { ReactComponentElement, ReactElement } from 'react';
import { fireEvent, render } from '@testing-library/react';

import { componentId, StepHeader, StepHeaderProps } from './StepHeader';

describe('StepHeader', () => {
  let outputSpy = jest.fn();
  let component: ReactElement<StepHeaderProps>;

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <StepHeader step={2} total={3} onBack={outputSpy} />;
  });

  it('renders', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  });

  it('shows current step', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(`${componentId}-Text`).textContent?.includes('2')).toBeTruthy();
  });

  it('shows total number of steps', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(`${componentId}-Text`).textContent?.includes('3')).toBeTruthy();
  });

  describe('Back button', () => {
    it('renders', () => {
      const { getByTestId } = render(component);

      expect(getByTestId(`${componentId}-BackButton`)).toBeInTheDocument();
    });

    it('calls onBack() prop when ckicked', () => {
      const { getByTestId } = render(component);
      fireEvent.click(getByTestId(`${componentId}-BackButton`));

      expect(outputSpy).toHaveBeenCalledTimes(1);
    });
  });
});
