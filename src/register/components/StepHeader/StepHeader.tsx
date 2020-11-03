import React from 'react';
import { cn } from '@bem-react/classname';
import { ArrowBack } from '@material-ui/icons';
import { Button, MobileStepper, Tooltip } from '@material-ui/core';

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

  return (
    <div className={css()} data-testid={test()}>
      <Tooltip title="Step back" placement="top-end">
        <Button
          className={css('Button')}
          data-testid={test('BackButton')}
          onClick={onBack}
          disableRipple
        >
          <ArrowBack className={css('Icon')} />
        </Button>
      </Tooltip>

      <p className={css('Text')} data-testid={test('Text')}>
        Step {step} of {total}
      </p>

      <MobileStepper
        className={css('Progress')}
        variant="progress"
        steps={total + 1}
        position="static"
        activeStep={step - 1}
        backButton={<span className="hidden">back</span>}
        nextButton={<span className="hidden">next</span>}
      />
    </div>
  )
};