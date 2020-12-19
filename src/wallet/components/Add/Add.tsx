import React from 'react';
import { cn } from '@bem-react/classname';

import './Add.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

export const componentId = 'Add';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface AddProps { }

export const Add: React.FC<AddProps> = () => {

  return (
    <div className={css()} data-testid={test()}>
      <h1> Add new wallet page is under construction...</h1>
    </div>
  )
};