import React from 'react';
import { cn } from '@bem-react/classname';

import './Manage.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

export const componentId = 'Manage';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface ManageProps { }

export const Manage: React.FC<ManageProps> = () => {

  return (
    <div className={css()} data-testid={test()}>
      <h1> Manage wallet page is under construction...</h1>
    </div>
  )
};