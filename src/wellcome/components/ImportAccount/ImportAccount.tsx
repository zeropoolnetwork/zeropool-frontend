import React from 'react';
import { cn } from '@bem-react/classname';

import './ImportAccount.scss';

const css = cn('ImportAccount');

interface ImportAccountProps { }

export const ImportAccount: React.FC<ImportAccountProps> = () => {

  return (
    <div className={css()} data-testid="ImportAccount">
      <h1> ImportAccount </h1>
    </div>
  )
};