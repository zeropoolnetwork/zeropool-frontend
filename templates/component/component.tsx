import React from 'react';
import { cn } from '@bem-react/classname';

import './TemplateName.scss';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';

export const componentId = 'TemplateName';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface TemplateNameProps { }

export const TemplateName: React.FC<TemplateNameProps> = () => {

  return (
    <div className={css()} data-testid={test()}>
      <h1> TemplateName </h1>
    </div>
  )
};