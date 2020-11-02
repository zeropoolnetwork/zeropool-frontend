import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { StepFour, componentId, StepFourProps } from './StepFour';

describe('StepFour', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<StepFourProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <StepFour onRegister={outputSpy} />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  });

  describe('RegisterButton', () => {
    it('should render', () => {
      const { getByTestId } = render(component);

      expect(getByTestId(`${componentId}-RegisterButton`)).toBeInTheDocument();
    });

    it('should call onRegister prop callback when clicked', () => {
      const { getByTestId } = render(component);
      let call: any;

      fireEvent.click(getByTestId(`${componentId}-RegisterButton`));

      call = outputSpy.mock.calls[0][0]; // "calls[0] is undefined" means no call was fired 

      expect(outputSpy).toHaveBeenCalledTimes(1);
      expect(call['password']).toBeDefined();
    });
  });
});
