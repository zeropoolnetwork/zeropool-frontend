import React from 'react';
import { cn } from '@bem-react/classname';

import './StepOne.scss';

const css = cn('StepOne');

interface StepOneProps { }

export const StepOne: React.FC<StepOneProps> = () => {

  return (
    <div className={css()} data-testid="StepOne">
      <h1> StepOne </h1>
    </div>
  )
};