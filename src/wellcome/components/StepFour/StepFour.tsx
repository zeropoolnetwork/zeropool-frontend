import React from 'react';
import { cn } from '@bem-react/classname';

import './StepFour.scss';

const css = cn('StepFour');

interface StepFourProps { }

export const StepFour: React.FC<StepFourProps> = () => {

  return (
    <div className={css()} data-testid="StepFour">
      <h1> StepFour </h1>
    </div>
  )
};