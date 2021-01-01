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

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

import { AboutPage } from 'about/components/AboutPage/AboutPage';

import { getCurrentView, getSupportedTokens, getSupportedTokensRecord, getUsdRates, getWalleAmounts } from 'wallet/state/wallet.selectors';
import { walletActions } from 'wallet/state/wallet.actions';
import { WalletHeader } from 'wallet/components/WalletHeader/WalletHeader';
import { WalletView } from 'wallet/state/models/wallet-view';
import { Balance } from 'wallet/components/Balance/Balance';
import { Wallets } from 'wallet/components/Wallets/Wallets';
import { Address } from 'wallet/components/Address/Address';

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
    minHeight: 150,
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
    paddingRight: '20px'
  },
  drowerItemIcon: {
    color: theme.palette.grey[600],
  },
  drowerItemText: {},
  wrapper: {
    display: 'flex',
    margin: '50px auto'
  }

}));

export const WalletPage: React.FC<WalletPageProps> = () => {
  const [state, setState] = useState({ drower: false });
  const dispatch = useDispatch();
  const classes = useStyles();
  const view = useSelector(getCurrentView);
  const rates = useSelector(getUsdRates);
  const tokens = useSelector(getSupportedTokens);
  const amounts = useSelector(getWalleAmounts);
  const tokensRecord = useSelector(getSupportedTokensRecord);

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

  const components = () => {
    switch (view) {
      case WalletView.Wallets:
        return <Wallets />
      case WalletView.Address:
        return <Address />
      case WalletView.About:
        return <AboutPage showBackButton={false} />
      default:
        return <Balance
          amounts={amounts}
          rates={rates}
          tokens={tokens.map(i => i.symbol)}
          tokensRecord={tokensRecord} />
    }
  }

  useEffect(() => {
    dispatch(walletActions.openWallet());
  }, [dispatch]);

  return (
    <div className={classes.root} data-testid={test()}>
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
                  <Badge badgeContent={0} color="secondary" title="No new messages">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <div className={classes.toolbarBody}>
            <WalletHeader
              view={view}
              tokenAmount={5}
              tokenRate={750}
              tokenSymbol={'ETH'}
              fiatValue={3250.43}
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