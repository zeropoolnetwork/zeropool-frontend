import React from 'react';
import { cn } from '@bem-react/classname';
import { ArrowBack } from '@material-ui/icons';
import { Button, MobileStepper, Tooltip } from '@material-ui/core';

import './StepHeader.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { Perl } from 'register/components/Perl/Perl';

export const componentId = 'StepHeader';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export type StepHeaderProps = {
  step: number
  total: number
  onBack: () => void
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

      <div className={css('Perls')} data-testid={test('Perls')}>
        {[1,2,3,4].map((value) => <Perl 
          classes={[css('Perl', {'Active': value === step})]}
          isActive={value === step} 
          key={value} 
          number={value} 
        />)}
      </div>

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