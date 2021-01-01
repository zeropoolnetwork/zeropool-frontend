import React from 'react';
import { cn } from '@bem-react/classname';

import './Wallets.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

export const componentId = 'Wallets';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface WalletsProps { }

export const Wallets: React.FC<WalletsProps> = () => {

  return (
    <div className={css()} data-testid={test()}>
      <h1> Wallets </h1>
    </div>
  )
};