import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { componentId, StepOne, StepOneProps } from './StepOne';

describe('StepOne', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<StepOneProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <StepOne onGenerate={outputSpy} />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  });

  describe('SubmitButton', () => {
    it('should render', () => {
      const { getByTestId } = render(component);

      expect(getByTestId(`${componentId}-GenerateButton`)).toBeInTheDocument();
    });

    it('should call onGenerate prop callback when clicked', () => {
      const { getByTestId } = render(component);
      fireEvent.click(getByTestId(`${componentId}-GenerateButton`));

      expect(outputSpy).toHaveBeenCalledTimes(1);
    });
  });
});
