import { AppBar, Toolbar, IconButton, SwipeableDrawer, Badge, List, ListItem, ListItemIcon, ListItemText, makeStyles, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import { cn } from '@bem-react/classname';

import { Token } from 'shared/models/token';
import { HelpPage } from 'shared/components/HelpPage/HelpPage';
import { AboutPage } from 'shared/components/AboutPage/AboutPage';
import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

import { getActiveToken, getActiveView, getSupportedTokens, getSupportedTokensRecord, getUsdRates, getAmounts, getWallets, getActiveWallet, getSendData } from 'wallet/state/wallet.selectors';
import { Wallets, WalletsButtonsHandler } from 'wallet/components/Wallets/Wallets';
import { WalletHeaderMode } from "wallet/components/WalletHeader/WalletHeaderMode";
import { walletActions } from 'wallet/state/wallet.actions';
import { WalletHeader } from 'wallet/components/WalletHeader/WalletHeader';
import { totalHelper } from 'wallet/state/helpers/total.helper';
import { WalletView } from 'wallet/state/models/wallet-view';
import { Balance } from 'wallet/components/Balance/Balance';
import { Wallet } from 'wallet/state/models/wallet';
import { Send } from 'wallet/components/Send/Send';
import { SendConfirmation } from 'wallet/components/SendConfirmation/SendConfirmation';
import { Receive } from 'wallet/components/Receive/Receive';

export const componentId = 'WalletPage';

const css = cn(componentId);
const test = testIdBuilder(componentId);

interface WalletPageProps { }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingTop: theme.spacing(1),
    minHeight: 160,
    paddingBottom: '0',
  },
  toolbarHeader: {
    display: 'flex',
    borderBottom: `${theme.palette.grey[600]} 1px solid`,
    width: '100%',
  },
  toolbarHeaderItems: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  toolbarBody: {
    margin: 'auto',
    position: 'relative',
    width: '100%',
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
  drower: {},
  drowerItem: {
    paddingRight: '20px',
  },
  drowerItemIcon: {
    color: theme.palette.grey[600],
  },
  drowerItemText: {},
  wrapper: {
    display: 'flex',
    margin: '50px auto',
  },
  AboutPage: {
    height: '50vh',
  }

}));

export const WalletPage: React.FC<WalletPageProps> = () => {
  const [state, setState] = useState({ drower: false });
  const dispatch = useDispatch();
  const classes = useStyles();
  const view = useSelector(getActiveView);
  const token = useSelector(getActiveToken);
  const rates = useSelector(getUsdRates);
  const tokens = useSelector(getSupportedTokens);
  const amounts = useSelector(getAmounts);
  const tokensRecord = useSelector(getSupportedTokensRecord);
  const wallet = useSelector(getActiveWallet);
  const wallets = useSelector(getWallets);
  const send = useSelector(getSendData);

  const toggleDrawer = (open?: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, drower: open === undefined ? !state.drower : open })
  }

  const drowerMenu = () => (
    <div
      className={classes.drower}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[WalletView.Balance, WalletView.Wallets].map((text, index) => (
          <ListItem className={classes.drowerItem} button key={text} onClick={() => dispatch(walletActions.menu(text))}>
            <ListItemIcon className={classes.drowerItemIcon}>
              {[<AttachMoneyOutlinedIcon />, <BuildOutlinedIcon />][index]}
            </ListItemIcon>
            <ListItemText className={classes.drowerItemText} primary={text} />
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {[WalletView.Help, WalletView.About].map((text, index) => (
          <ListItem button key={text} onClick={() => dispatch(walletActions.menu(text))}>
            <ListItemIcon className={css('DrowerMenu-ItemIcon')}>
              {[<InfoOutlinedIcon />, <HelpOutlineIcon />][index]}
            </ListItemIcon>
            <ListItemText className={css('DrowerMenu-ItemText')} primary={text} />
          </ListItem>
        ))}
      </List>
    </div >
  );

  const walletsButtonHandler: WalletsButtonsHandler = {
    onReceiveClick: (wallet: Wallet) => dispatch(walletActions.openReceiveView(wallet)),
    onSendClick: (wallet: Wallet) => dispatch(walletActions.openSendInitialView(wallet)),
    onEditClick: (wallet: Wallet) => dispatch(walletActions.edit(wallet)),
  }

  const components = () => {
    switch (view) {
      case WalletView.Wallets:
        return token ? <Wallets 
          handler={walletsButtonHandler}
          rate={rates[token.symbol]}
          token={token} 
          wallets={wallets ? Object.values(wallets) : []}
        /> : null;
      case WalletView.Send:
        return wallet && token ? <Send
            rate={rates[token.symbol]}
            wallet={wallet}
            onNextClick={(address, amount) => dispatch(walletActions.openSendConfirmView({wallet, address, amount}))}
          /> : null;
      case WalletView.SendConfirmation:
        return send && token ? <SendConfirmation
            amount={send.amount}
            address={send.address}
            rate={rates[token.symbol]}
            wallet={send.wallet}
            onConfirmClick={()=> dispatch(walletActions.send())}
          /> : null; 
      case WalletView.Receive:
        return wallet ? <Receive
        address={wallet.address}
        rate={rates[wallet.address.symbol]}
        /> : null;
      case WalletView.About:
        return <AboutPage showBackButton={false} />
      case WalletView.Help:
        return <HelpPage />
      default:
        return <Balance
          amounts={amounts}
          onSelectToken={(token: Token) => dispatch(walletActions.openWalletsView(token))}
          rates={rates}
          tokens={tokens.map(i => i.symbol)}
          tokensRecord={tokensRecord} />
    }
  }

  const walletHeaderMode = [WalletView.Help, WalletView.About].includes(view) ? 
    WalletHeaderMode.Info : WalletHeaderMode.Balance;

  const walletHeaderLabels: Record<WalletView, string> = {
    [WalletView.Balance]: 'Overall balance',
    [WalletView.Wallets]: `${token?.name} wallets`,
    [WalletView.Receive]: `${wallet?.name}`,
    [WalletView.Send]: `${wallet?.name}`,
    [WalletView.SendConfirmation]: `${wallet?.name}`,
    [WalletView.Address]: 'x12345',
    [WalletView.About]: 'About',
    [WalletView.Help]: 'Help',
  };
  
  useEffect(() => {
    dispatch(walletActions.openBalanceView());
  }, [dispatch]);

  return (
    <div className={classes.root} data-testid={test()} id={componentId}>
      <AppBar position="static" className={css('AppBar')}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.toolbarHeader}>
            <IconButton
              onClick={toggleDrawer()}
              color="inherit"
              aria-label="menu"
              edge="start"
            >
              <MenuIcon />
            </IconButton>

            <div className={classes.toolbarHeaderItems}>
              <Tooltip title="No new messages" placement="bottom">
                <IconButton aria-label="show 0 new notifications" color="inherit">
                  <Badge badgeContent={0} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <div className={classes.toolbarBody}>
            <WalletHeader
              mode={walletHeaderMode}
              label={walletHeaderLabels[view]}
              hideBackButton={view === WalletView.Balance}
              fiatValue={walletHeaderMode === WalletHeaderMode.Info ? undefined : totalHelper(amounts, rates, token?.symbol)}
              tokenAmount={token ? amounts[token.symbol] : undefined}
              tokenSymbol={token?.symbol}
              tokenName={token?.name}
              onBackClick={() => dispatch(walletActions.headerBack())}
            />
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.wrapper}>
        {components()}
      </div>

      <SwipeableDrawer
        open={state['drower']}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {drowerMenu()}
      </SwipeableDrawer>
    </div>
  )
};
