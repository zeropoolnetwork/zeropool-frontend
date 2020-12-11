import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import { Button } from '@material-ui/core';

import './StepThree.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

import { SeedPanel } from 'register/components/SeedPanel/SeedPanel';

export const componentId = 'StepThree';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface StepThreeProps {
  seed: string[];
  onConfirm: () => void;
}
export const StepThree: React.FC<StepThreeProps> = ({ seed, onConfirm }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  return (
    <div className={css()} data-testid={test()}>
      <section>
        <SeedPanel seed={seed} check onCheck={(success: boolean) => setButtonDisabled(!success)} />

        <p>
          Please confirm your secret phrase.
          We want to be sure that you saved it correctly.
        </p>
      </section>

      <Button
        color="primary"
        className={css('Button', { Disabled: buttonDisabled })}
        data-testid={test('ConfirmButton')}
        disabled={buttonDisabled}
        disableElevation
        onClick={onConfirm}
        variant="contained"
      >
        Confirm
      </Button>
    </div>
  )
};