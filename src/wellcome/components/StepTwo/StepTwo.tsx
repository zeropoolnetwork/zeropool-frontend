import React from 'react';
import { cn } from '@bem-react/classname';

import './StepTwo.scss';

const css = cn('StepTwo');

interface StepTwoProps { }

export const StepTwo: React.FC<StepTwoProps> = () => {

  return (
    <div className={css()} data-testid="StepTwo">
      <h1> StepTwo </h1>
    </div>
  )
};