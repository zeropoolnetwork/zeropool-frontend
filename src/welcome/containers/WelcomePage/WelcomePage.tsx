import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as React from 'react';
import { push } from 'connected-react-router';
import { cn } from '@bem-react/classname';

import './WelcomePage.scss';
import logo from 'assets/images/guy-fawkes-thanks.png';

import { StepOne } from 'welcome/components/StepOne/StepOne';
import { StepTwo } from 'welcome/components/StepTwo/StepTwo';
import { StepFour } from 'welcome/components/StepFour/StepFour';
import { StepThree } from 'welcome/components/StepThree/StepThree';
import { ImportAccount } from 'welcome/components/ImportAccount/ImportAccount';

const css = cn('WelcomePage');

export const WelcomePage = () => {
  let match = useRouteMatch();
  const dispatch = useDispatch();

  return (
    <div className={css()}>
      <header className={css('Header')}>
        <img src={logo} className={css('Logo')} alt="logo" />
        <h1 className={css('Greeting')}>
          Welcome to ZeroPool
        </h1>
        <p className={css('Description')}>
          Please create an account or import an existing one using a secret phrase
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
