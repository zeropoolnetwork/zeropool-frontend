import { cn } from '@bem-react/classname';
import SettingsIcon from '@material-ui/icons/Settings';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import React, { useEffect, useState } from 'react';

import './WalletRow.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { RoundButton } from 'shared/components/RoundButton/RoundButton';
import { IconOption } from 'shared/components/Icon/IconOption';
import { Token } from 'shared/models/token';
import { Icon } from 'shared/components/Icon/Icon';

import { ExpandButton } from 'wallet/components/ExpandButton/ExpandButton';
import { Wallet } from 'wallet/state/models/wallet';

export const componentId = 'WalletRow';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export type WalletRowProps = { 
  rollUp: number
  rate: number
  token: Token
  wallet: Wallet

  onEditClick: (wallet: Wallet) => void
  onReceiveClick: (wallet: Wallet) => void
  onSendClick: (wallet: Wallet) => void
  onRollUpClick: () => void
  onWalletNameClick: (wallet: Wallet) => void
}

export const WalletRow: React.FC<WalletRowProps> = ({token, wallet, rate, rollUp, onReceiveClick, onSendClick, onEditClick, onRollUpClick , onWalletNameClick}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [toBeOpened, setToBeOpened] = useState(false);
  
  const showButtonsHandler = () => {
    if (showButtons) {
      setShowButtons(false)
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
    // eslint-disable-next-line
  }, [wallet.name, rollUp]);

  return (
    <div className={css({Expanded: showButtons}, ['noselect'])} data-testid={test()}>
      <div className={css('Main')}>
        <Icon className={css('Icon')} icon={wallet.token.symbol as IconOption} />

        <div className={css('Values')}>
          <div className={css('WalletName', ['noselect'])} onClick={() => onWalletNameClick(wallet)}>{wallet.name}</div>
          <div className={css('WalletAmount')}>{wallet.amount} {token.symbol} ({(rate * wallet.amount).toFixed(2)} $)</div>
        </div>

        <ExpandButton className={css('Expander')} expanded={showButtons} click={showButtonsHandler} />
      </div>

      <div className={css('Buttons', {Hidden: !showButtons})}>
        <RoundButton className={css('Button1')} label={'Send'} onClick={() => onSendClick(wallet)}>
          <VerticalAlignTopIcon />
        </RoundButton>
        
        <RoundButton className={css('Button2')} label={'Receive'} onClick={() => onReceiveClick(wallet)}>
          <VerticalAlignBottomIcon />
        </RoundButton>

        <RoundButton className={css('Button2')} label={'Edit'} onClick={() => onEditClick(wallet)}>
          <SettingsIcon />
        </RoundButton>
      </div>
    </div>
  )
};