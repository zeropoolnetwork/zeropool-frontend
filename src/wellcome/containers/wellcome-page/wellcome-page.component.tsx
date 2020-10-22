import * as React from 'react';
import { cn } from '@bem-react/classname';

import './wellcome-page.component.scss';
import logo from 'assets/images/guy-fawkes-thanks.png';

const css = cn('WellcomePage');

export const WellcomePageComponent: React.FC = () => {

  return (
    <div className={css()}>
      <header className={css('Header')}>
        <img src={logo} className={css('Logo')} alt="logo" />
        <h1>
          Wellcome to ZeroPool
      </h1>
      </header>
    </div>
  );
}
