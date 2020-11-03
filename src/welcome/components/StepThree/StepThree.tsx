import React from 'react';
import { cn } from '@bem-react/classname';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import './StepThree.scss';

const css = cn('StepThree');

interface StepThreeProps { }

export const StepThree: React.FC<StepThreeProps> = () => {
  const dispatch = useDispatch();

  return (
    <div className={css()} data-testid="StepThree">
      <h1> StepThree </h1>

      <p>
        Please confirm your secret phrase.
        We want to be sure that you saved it correctly.
      </p>

      <button
        className={css('BackButton')}
        onClick={() => dispatch(push('/create-account-step2'))}
      >
        Previous screen
      </button>

      <button
        className={css('ActionButton')}
        onClick={() => dispatch(push('/create-account-step4'))}
      >
        Next
      </button>
    </div>
  )
};