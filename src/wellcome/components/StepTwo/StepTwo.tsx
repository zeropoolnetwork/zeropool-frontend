import React from 'react';
import { cn } from '@bem-react/classname';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import './StepTwo.scss';

const css = cn('StepTwo');

interface StepTwoProps { }

export const StepTwo: React.FC<StepTwoProps> = () => {
  const dispatch = useDispatch();

  return (
    <div className={css()} data-testid="StepTwo">
      <h1> StepTwo </h1>

      <p>
        By clicking you confirming that this secret phrase
        is stored on paper or using other method.
      </p>

      <button
        className={css('BackButton')}
        onClick={() => dispatch(push('/create-account-step1'))}
      >
        Previous screen
      </button>

      <button
        className={css('ActionButton')}
        onClick={() => dispatch(push('/create-account-step3'))}
      >
        Next
      </button>
    </div>
  )
};