import React from 'react';
import { cn } from '@bem-react/classname';
import { Button } from '@material-ui/core';

import './StepTwo.scss';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';

export const componentId = 'StepTwo';

const css = cn(componentId);
const test = testIdBuilder(componentId);

interface StepTwoProps {
  seed: string[] | undefined;
  onSubmit: () => void;
}

export const StepTwo: React.FC<StepTwoProps> = ({ seed, onSubmit }) => {

  return (
    <div className={css()} data-testid="StepTwo">
      <h1> {seed} </h1>

      <p>
        By clicking you confirming that this secret phrase
        is stored on paper or using other method.
      </p>

      <Button
        color="primary"
        className={css('Button')}
        data-testid={test('SubmitButton')}
        disableElevation
        onClick={onSubmit}
        variant="contained"
      >
        Next
      </Button>
    </div>
  )
};