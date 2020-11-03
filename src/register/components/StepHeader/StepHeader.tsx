import React from 'react';
import { cn } from '@bem-react/classname';
import { Button, MobileStepper } from '@material-ui/core';

import './StepHeader.scss';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';

export const componentId = 'StepHeader';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface StepHeaderProps {
  step: number;
  total: number;
  onBack: () => void;
}

export const StepHeader: React.FC<StepHeaderProps> = ({ step, total, onBack }) => {
  const backButton =
    <Button
      className={css('Button')}
      data-testid={test('BackButton')}
      onClick={onBack}
    >back</Button>

  return (
    <div className={css()} data-testid={test()}>
      <span className={css('Text')} data-testid={test('Text')}>
        Step {step} of {total}
      </span>

      <MobileStepper
        variant="progress"
        steps={total}
        position="static"
        activeStep={step}
        backButton={backButton}
        nextButton={<span></span>}
      />
    </div>
  )
};