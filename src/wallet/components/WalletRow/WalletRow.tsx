import React, { useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';

import './WalletRow.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { IconOption } from 'shared/components/Icon/IconOption';
import { Address } from 'shared/models/address';
import { Token } from 'shared/models/token';
import { Icon } from 'shared/components/Icon/Icon';

import { ExpandButton } from 'wallet/components/ExpandButton/ExpandButton';

export const componentId = 'WalletRow';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface WalletRowProps { 
  rollUp: number;
  rate: number;
  token: Token;
  wallet: {address: Address, amount: number, name: string};

  onReceiveClick: () => void;
  onSendClick: () => void;
  onEditClick: () => void;
  onRollUpClick: () => void;
}

export const WalletRow: React.FC<WalletRowProps> = ({token, wallet, rate, rollUp, onRollUpClick}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [toBeOpened, setToBeOpened] = useState(false);
  
  const showButtonsHandler = () => {
    if (showButtons) {
      setShowButtons(false);
    } else {
      onRollUpClick();
      setToBeOpened(true);
    }
  }

  useEffect(() => {
    if(toBeOpened) {
      setToBeOpened(false);
      setShowButtons(true);
    } else {
      setShowButtons(false);
    };
  }, [wallet.name, rollUp]);

  return (
    <div className={css({Expanded: showButtons})} data-testid={test()}>
      <div className={css('Main')}>
        <Icon className={css('Icon')} icon={wallet.address.symbol as IconOption} />

        <div className={css('Values')}>
          <div className={css('WalletName')}>{wallet.name}</div>
          <div className={css('WalletAmount')}>{wallet.amount} {token.symbol} ({(rate * wallet.amount).toFixed(2)} $)</div>
        </div>

        <ExpandButton className={css('Expander')} expanded={showButtons} click={showButtonsHandler} />
      </div>

      <div className={css('Buttons', {Hidden: !showButtons})}>
        BUTTON_1 BUTTON_2
      </div>
    </div>
  )
};