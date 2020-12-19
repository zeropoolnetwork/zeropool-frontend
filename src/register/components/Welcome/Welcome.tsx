import * as React from 'react';
import { Button } from '@material-ui/core';
import { cn } from '@bem-react/classname';

import './Welcome.scss';
import guy from 'assets/images/guy-fawkes-thanks.png';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

export const componentId = 'Welcome';
export interface WelcomeProps {
  // TODO: remove onMockedLogin after API is connected
  onMockedLogin: () => void;
  onCreate: () => void;
  onImport: () => void;
  onAbout: () => void;
}

const css = cn(componentId);
const test = testIdBuilder(componentId);

export const Welcome: React.FC<WelcomeProps> = ({ onCreate, onImport, onAbout, onMockedLogin }) => {

  return (
    <div className={css()} data-testid={test()}>
      <section>
        <img src={guy} className={css('Logo')} data-testid={test('Logo')} alt="logo" onClick={onMockedLogin} />

        <h1 className={css('Greeting')} data-testid={test('Greeting')} >
          Welcome to ZeroPool
        </h1>

        <p className={css('Description')} data-testid={test('Description')}>
          Please create a new wallet or import an existing one using a secret phrase
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
        Create new wallet
      </Button>

      <Button
        variant="outlined"
        color="primary"
        className={css('Button')}
        data-testid={test('ImportButton')}
        onClick={onImport}
      >
        Import existing
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
