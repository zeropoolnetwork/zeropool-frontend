import React from 'react';
import { cn } from '@bem-react/classname';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import './StepFour.scss';

const css = cn('StepFour');

interface StepFourProps { }

export const StepFour: React.FC<StepFourProps> = () => {
  const dispatch = useDispatch();

  return (
    <div className={css()} data-testid="StepFour">
      <h1> StepFour </h1>

      <p>
        Finally, please choose a password to be used
        to export your account secret in the future.
      </p>

      <button
        className={css('BackButton')}
        onClick={() => dispatch(push('/create-account-step3'))}
      >
        Previous screen
      </button>

      <button
        className={css('ActionButton')}
        onClick={() => dispatch(push('/wallet'))}
      >
        Next
      </button>
    </div>
  )
};