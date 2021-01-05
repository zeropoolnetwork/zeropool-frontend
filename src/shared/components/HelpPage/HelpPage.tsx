import React from 'react';
import { cn } from '@bem-react/classname';

import './HelpPage.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

export const componentId = 'HelpPage';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface HelpPageProps { }

export const HelpPage: React.FC<HelpPageProps> = () => {

  return (
    <div className={css()} data-testid={test()}>
      <h1> Help Page is under construction...</h1>
    </div>
  )
};