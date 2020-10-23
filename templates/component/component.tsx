import React from 'react';
import { cn } from '@bem-react/classname';

import './TemplateName.scss';

const css = cn('TemplateName');

interface TemplateNameProps { }

export const TemplateName: React.FC<TemplateNameProps> = () => {

  return (
    <div className={css()} data-testid="TemplateName">
      <h1> TemplateName </h1>
    </div>
  )
};