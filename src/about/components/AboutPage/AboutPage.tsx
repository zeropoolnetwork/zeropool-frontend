import React from 'react';
import { cn } from '@bem-react/classname';
import { push } from 'connected-react-router';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import './AboutPage.scss';
import logo from 'assets/logo.svg';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';

export const componentId = 'AboutPage';

const css = cn(componentId);
const test = testIdBuilder(componentId);

interface AboutPageProps { }

export const AboutPage: React.FC<AboutPageProps> = () => {
  const dispatch = useDispatch();

  return (
    <div className={css()} data-testid="AboutPage">
      <img src={logo} className={css('Logo')} data-testid={test('Logo')} alt="logo" />

      <h1 className={css('Header')}> WHAT IS ZEROPOOL </h1>

      <p className={css('Text')}>
        ZeroPool is fully private multi-blokchain solution.
        Low transaction fees, atomic swaps and common anonymity set.
        Balances and transaction graph are hidden and compatibility
        with network identity hiding technologies, like Tor.
        You can deposit, transfer and withdraw tokens in our product.
      </p>

      <p className={css('Text')}>
        The projec was found at ethDenver by a group of reserchers
        and still developed as product with strong scientific base.
      </p>

      <p className={css('Button')}>
        <Button
          color="primary"
          data-testid={test('BackButton')}
          disableElevation
          onClick={() => dispatch(push('/'))}
          variant="outlined"
        >
          Back
        </Button>
      </p>
    </div>
  )
};
