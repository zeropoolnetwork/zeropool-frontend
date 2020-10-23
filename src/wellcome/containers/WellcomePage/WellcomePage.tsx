import * as React from 'react';
import { cn } from '@bem-react/classname';

import './WellcomePage.scss';
import logo from 'assets/images/guy-fawkes-thanks.png';

const css = cn('WellcomePage');

export const WellcomePageComponent: React.FC = () => {

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
    </div>
  );
}
