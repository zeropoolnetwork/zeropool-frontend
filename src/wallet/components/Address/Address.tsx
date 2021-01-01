import React from 'react';
import { cn } from '@bem-react/classname';

import './Address.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

export const componentId = 'Address';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface AddressProps { }

export const Address: React.FC<AddressProps> = () => {

  return (
    <div className={css()} data-testid={test()}>
      <h1> Address </h1>
    </div>
  )
};