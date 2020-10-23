import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as React from 'react';
import { push } from 'connected-react-router';
import { cn } from '@bem-react/classname';

import './WellcomePage.scss';
import logo from 'assets/images/guy-fawkes-thanks.png';

import { StepOne } from 'wellcome/components/StepOne/StepOne';
import { StepTwo } from 'wellcome/components/StepTwo/StepTwo';
import { StepFour } from 'wellcome/components/StepFour/StepFour';
import { StepThree } from 'wellcome/components/StepThree/StepThree';
import { ImportAccount } from 'wellcome/components/ImportAccount/ImportAccount';

const css = cn('WellcomePage');

export const WellcomePage = () => {
  let match = useRouteMatch();
  const dispatch = useDispatch();

  return (
    <div className={css()}>
      <header className={css('Header')}>
        <img src={logo} className={css('Logo')} alt="logo" />
        <h1 className={css('Greeting')}>
          Wellcome to ZeroPool
        </h1>
        <p className={css('Description')}>
          Please create account or import existing one using secret phrase
        </p>
      </header>

      <ul>
        <li>
          <button
            className={css('ActionButton')}
            onClick={() => dispatch(push('/create-account-step1'))}
          >
            Create
          </button>
        </li>

        <li>
          <button
            className={css('ActionButton')}
            onClick={() => dispatch(push('/import-account'))}
          >
            Import
          </button>
        </li>

        <li>
          <button
            className={css('ActionButton')}
            onClick={() => dispatch(push('/about'))}
          >
            About
          </button>
        </li>
      </ul>
    </div>
  );
}
