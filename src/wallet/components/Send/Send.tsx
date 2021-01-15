import React from 'react';
import { cn } from '@bem-react/classname';

import './Send.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

export const componentId = 'Send';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface SendProps { }

export const Send: React.FC<SendProps> = () => {

  return (
    <div className={css()} data-testid={test()}>
      <h1> Send </h1>
    </div>
  )
};      