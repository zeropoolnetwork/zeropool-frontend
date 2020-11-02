import React from 'react';
import { cn } from '@bem-react/classname';

import './StepFour.scss';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';
import { Button } from '@material-ui/core';

export const componentId = 'StepFour';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface StepFourProps {
  onRegister: (data: { password: string }) => void;
}

export const StepFour: React.FC<StepFourProps> = ({ onRegister }) => {
  let password = '';

  return (
    <div className={css()} data-testid={test()}>
      <h1> Password: {password} </h1>

      <p>
        Final step. Please generate password to be used
        to export your account secret in the future.
      </p>

      <Button
        color="primary"
        className={css('Button')}
        data-testid={test('RegisterButton')}
        disableElevation
        onClick={() => onRegister({ password })}
        variant="contained"
      >
        Register
      </Button>
    </div>
  )
};
