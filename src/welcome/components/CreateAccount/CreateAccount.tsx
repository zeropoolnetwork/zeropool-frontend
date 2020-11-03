import React from 'react';
import { cn } from '@bem-react/classname';

import './CreateAccount.scss';

const css = cn('CreateAccount');

interface CreateAccountProps { }

export const CreateAccount: React.FC<CreateAccountProps> = () => {

  return (
    <div className={css()} data-testid="CreateAccount">
      <h1> CreateAccount </h1>
    </div>
  )
};