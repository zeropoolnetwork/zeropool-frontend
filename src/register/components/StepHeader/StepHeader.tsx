import React from 'react';
import { cn } from '@bem-react/classname';
import { Button, MobileStepper } from '@material-ui/core';

import './StepHeader.scss';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';

export const componentId = 'StepHeader';

const css = cn(componentId);
const test = testIdBuilder(componentId);

interface StepHeaderProps {
  step: number;
  total: number;
  onBack: () => void;
}

export const StepHeader: React.FC<StepHeaderProps> = ({ step, total, onBack }) => {

  return (
    <div className={css()} data-testid={test()}>
      <Button
        className={css('Button')}
        data-testid={test('BackButton')}
        onClick={onBack}
      ></Button>

      <span className={css('Text')} data-testid={test('Text')}>
        Step {step} of {total}
      </span>

      <MobileStepper
        variant="progress"
        steps={total}
        position="static"
        activeStep={step}
        backButton={<span></span>}
        nextButton={<span></span>}
      />
    </div>
  )
};