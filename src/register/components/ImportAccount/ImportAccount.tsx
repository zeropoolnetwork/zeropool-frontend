import React from 'react';
import { cn } from '@bem-react/classname';
import { Button } from '@material-ui/core';

import './ImportAccount.scss';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';

export const componentId = 'ImportAccount';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface ImportAccountProps {
  onBack: () => void;
  onImport: (data: { seed: string[], password: string }) => void;
}

export const ImportAccount: React.FC<ImportAccountProps> = ({ onBack, onImport }) => {
  let seed: string[] = [];
  let password = '';

  return (
    <div className={css()} data-testid={test()}>
      <h1> ImportAccount </h1>

      <Button
        color="primary"
        data-testid={test('ImportButton')}
        disableElevation
        onClick={() => onImport({ seed, password })}
        variant="outlined"
      >
        Import
      </Button>

      <Button
        color="primary"
        data-testid={test('BackButton')}
        disableElevation
        onClick={onBack}
        variant="contained"
      >
        Back
      </Button>
    </div >
  )
};