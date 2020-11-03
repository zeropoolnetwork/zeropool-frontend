import * as React from 'react';
import { Button } from '@material-ui/core';
import { cn } from '@bem-react/classname';

import './Wellcome.scss';
import guy from 'assets/images/guy-fawkes-thanks.png';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';

export const componentId = 'Wellcome';
export interface WellcomeProps {
  onCreate: () => void;
  onImport: () => void;
  onAbout: () => void;
}

const css = cn(componentId);
const test = testIdBuilder(componentId);

export const Wellcome: React.FC<WellcomeProps> = ({ onCreate, onImport, onAbout }) => {

  return (
    <div className={css()} data-testid={test()}>
      <section>
        <img src={guy} className={css('Logo')} data-testid={test('Logo')} alt="logo" />

        <h1 className={css('Greeting')} data-testid={test('Greeting')} >
          Wellcome to ZeroPool
        </h1>

        <p className={css('Description')} data-testid={test('Description')}>
          Please create account or import existing one using secret phrase
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
        Import existed account
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
