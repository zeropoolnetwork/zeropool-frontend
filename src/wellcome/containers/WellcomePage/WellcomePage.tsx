import { useDispatch } from 'react-redux';
import * as React from 'react';
import { Button } from '@material-ui/core';
import { push } from 'connected-react-router';
import { cn } from '@bem-react/classname';

import './WellcomePage.scss';
import logo from 'assets/images/guy-fawkes-thanks.png';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';

export const componentId = 'WellcomePage';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export const WellcomePage = () => {
  const dispatch = useDispatch();

  return (
    <div className={css()} data-testid={test()}>
      <header className={css('Header')} data-testid={test('Header')}>
        <img src={logo} className={css('Logo')} data-testid={test('Logo')} alt="logo" />

        <h1 className={css('Greeting')} data-testid={test('Greeting')} >
          Wellcome to ZeroPool
        </h1>

        <p className={css('Description')} data-testid={test('Description')}>
          Please create account or import existing one using secret phrase
        </p>
      </header>

      <Button
        variant="contained"
        color="primary"
        className={css('Button')}
        data-testid={test('CreateButton')}
        onClick={() => dispatch(push('/create-account-step1'))}
        disableElevation
      >
        Create
      </Button>

      <Button
        variant="outlined"
        color="primary"
        className={css('Button')}
        data-testid={test('ImportButton')}
        onClick={() => dispatch(push('/import-account'))}
      >
        Import
      </Button>

      <Button
        variant="outlined"
        color="primary"
        className={css('Button')}
        data-testid={test('AboutButton')}
        onClick={() => dispatch(push('/about'))}
      >
        About
      </Button>
    </div>
  );
}
