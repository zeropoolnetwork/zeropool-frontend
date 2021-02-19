import React from 'react';
import { cn } from '@bem-react/classname';
import { Button } from '@material-ui/core';

import './StepOne.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

import { SeedPanel } from 'register/components/SeedPanel/SeedPanel';

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
        <SeedPanel classes={[css('SeedPanel')]} seed={[]} />

        <p className={css('Description')}>
          Your secret phrase consists of 12 words. Store it carefully.
          If you loose it, you will loose access to all of your
          associated wallets!
       </p>
      </section>

      <Button
        color="primary"
        className={css('Button')}
        data-testid={test('GenerateButton')}
        onClick={onGenerate}
        variant="contained"
      >
        Generate a secret phrase
      </Button>
    </div>
  )
};