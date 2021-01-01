import React from 'react';
import { cn } from '@bem-react/classname';

import './Log.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

export const componentId = 'Log';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface LogProps { }

export const Log: React.FC<LogProps> = () => {

  return (
    <div className={css()} data-testid={test()}>
      <h1> Log </h1>
    </div>
  )
};