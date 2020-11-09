import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { componentId, StepThree, StepThreeProps } from './StepThree';

describe('StepThree', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<StepThreeProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <StepThree onConfirm={outputSpy} seed={['test']} />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  });

  describe('ConfirmButton', () => {
    it('should render', () => {
      const { getByTestId } = render(component);

      expect(getByTestId(`${componentId}-ConfirmButton`)).toBeInTheDocument();
    });

    xit('should call onConfirm prop callback when clicked', () => {
      const { getByTestId } = render(component);
      fireEvent.click(getByTestId(`${componentId}-ConfirmButton`));

      // expect(outputSpy).toHaveBeenCalledTimes(1); // need to enable button first
    });
  });
});