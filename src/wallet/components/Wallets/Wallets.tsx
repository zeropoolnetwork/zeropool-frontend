import React, { useState } from 'react';
import { cn } from '@bem-react/classname';

import './Wallets.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { Address } from 'shared/models/address';
import { Token } from 'shared/models/token';

import { WalletRow } from 'wallet/components/WalletRow/WalletRow';
import { Wallet } from 'wallet/state/models/wallet';

export const componentId = 'Wallets';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface WalletsButtonsHandler {
  onReceiveClick: (wallet: Wallet) => void;
  onSendClick: (wallet: Wallet) => void;
  onEditClick: (wallet: Wallet) => void;
};
export interface WalletsProps {
  handler: WalletsButtonsHandler;
  rate: number;
  token: Token;
  wallets: Wallet[];
};

export const Wallets: React.FC<WalletsProps> = ({handler, wallets, rate, token}) => {
  const [rollUpSignal, setRollUpSignal] = useState(0);

  return (
    <div className={css()} data-testid={test()}>
      {wallets.map((wallet, index) =>
        <WalletRow
          rollUp={rollUpSignal}
          wallet={wallet}
          token={token}
          rate={rate}
          key={index}

          onReceiveClick={handler.onReceiveClick}
          onSendClick={handler.onSendClick}
          onEditClick={handler.onEditClick}
          onRollUpClick={() => setRollUpSignal(rollUpSignal+1)}
        />
      )}
    </div>
  )
};