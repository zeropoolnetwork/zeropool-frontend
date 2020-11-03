import React from 'react';
import { cn } from '@bem-react/classname';
import { Button } from '@material-ui/core';

import './StepThree.scss';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';

export const componentId = 'StepThree';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface StepThreeProps {
  seed: string[] | undefined;
  onConfirm: () => void;
}
export const StepThree: React.FC<StepThreeProps> = ({ seed, onConfirm }) => {

  return (
    <div className={css()} data-testid="StepThree">
      <section>
        <h1> {seed} </h1>

        <p>
          Please confirm your secret phrase.
          We want to be sure that you saved id correctly.
        </p>
      </section>

      <Button
        color="primary"
        className={css('Button')}
        data-testid={test('ConfirmButton')}
        disableElevation
        onClick={onConfirm}
        variant="contained"
      >
        Confirm
      </Button>
    </div>
  )
};