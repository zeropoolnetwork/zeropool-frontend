import React from 'react';
import { cn } from '@bem-react/classname';

import './WalletPage.scss';

const css = cn('WalletPage');

interface WalletPageProps { }

export const WalletPage: React.FC<WalletPageProps> = () => {

  return (
    <div className={css()} data-testid="WalletPage">
      <h1> WalletPage </h1>
    </div>
  )
};