import React from 'react';
import { cn } from '@bem-react/classname';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import './StepFour.scss';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';

export const componentId = 'StepFour';

const css = cn(componentId);
const test = testIdBuilder(componentId);

interface StepFourProps { }

export const StepFour: React.FC<StepFourProps> = () => {
  const dispatch = useDispatch();

  return (
    <div className={css()} data-testid={test()}>
      <h1> StepFour </h1>

      <p>
        Final step. Please generate password to be used
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