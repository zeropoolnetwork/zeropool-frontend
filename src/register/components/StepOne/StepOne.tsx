import React from 'react';
import { cn } from '@bem-react/classname';
import { Button } from '@material-ui/core';

import './StepOne.scss';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';

export const componentId = 'StepOne';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface StepOneProps {
  onGenerate: () => void;
}

export const StepOne: React.FC<StepOneProps> = ({ onGenerate }) => {

  return (
    <div className={css()} data-testid={test()}>
      <section>
        <h1> StepOne </h1>

        <p>
          Your secret phrase consists of 12 words. Store it carefully.
          If you loose it, you will loose access to all of your
          associated wallets!
       </p>
      </section>

      <Button
        color="primary"
        className={css('Button')}
        data-testid={test('GenerateButton')}
        disableElevation
        onClick={onGenerate}
        variant="contained"
      >
        Generate a secret phrase
      </Button>
    </div>
  )
};