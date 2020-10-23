import React from 'react';
import { cn } from '@bem-react/classname';

import './StepThree.scss';

const css = cn('StepThree');

interface StepThreeProps { }

export const StepThree: React.FC<StepThreeProps> = () => {

  return (
    <div className={css()} data-testid="StepThree">
      <h1> StepThree </h1>
    </div>
  )
};