import * as React from 'react';
import { Button } from '@material-ui/core';
import { cn } from '@bem-react/classname';

import './Welcome.scss';
import guy from 'assets/images/guy-fawkes-thanks.png';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';

export const componentId = 'Welcome';
export interface WelcomeProps {
  onCreate: () => void;
  onImport: () => void;
  onAbout: () => void;
}

const css = cn(componentId);
const test = testIdBuilder(componentId);

export const Welcome: React.FC<WelcomeProps> = ({ onCreate, onImport, onAbout }) => {

  return (
    <div className={css()} data-testid={test()}>
      <section>
        <img src={guy} className={css('Logo')} data-testid={test('Logo')} alt="logo" />

        <h1 className={css('Greeting')} data-testid={test('Greeting')} >
          Welcome to ZeroPool
        </h1>

        <p className={css('Description')} data-testid={test('Description')}>
          Please create an account or import an existing one using a secret phrase
        </p>
      </section>

      <Button
        color="primary"
        className={css('Button')}
        data-testid={test('CreateButton')}
        disableElevation
        onClick={onCreate}
        variant="contained"
      >
        Create new account
      </Button>

      <Button
        variant="outlined"
        color="primary"
        className={css('Button')}
        data-testid={test('ImportButton')}
        onClick={onImport}
      >
        Import existed
      </Button>

      <Button
        variant="outlined"
        color="primary"
        className={css('Button')}
        data-testid={test('AboutButton')}
        onClick={onAbout}
      >
        About zeropool
      </Button>
    </div>
  );
}