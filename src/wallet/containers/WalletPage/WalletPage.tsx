import { AppBar, Toolbar, IconButton, Typography, SwipeableDrawer, Badge, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import { cn } from '@bem-react/classname';

import './WalletPage.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

import { AboutPage } from 'about/components/AboutPage/AboutPage';

import { getCurrentView, getDisplayedTokens, getSupportedTokensRecord, getUsdRates, getWalleAmounts, getWalletName } from 'wallet/state/wallet.selectors';
import { walletActions } from 'wallet/state/wallet.actions';
import { WalletView } from 'wallet/state/models/wallet-view';
import { Balance } from 'wallet/components/Balance/Balance';
import { Manage } from 'wallet/components/Manage/Manage';
import { Add } from 'wallet/components/Add/Add';

export const componentId = 'WalletPage';

const css = cn(componentId);
const test = testIdBuilder(componentId);

interface WalletPageProps { }

export const WalletPage: React.FC<WalletPageProps> = () => {
  const name = useSelector(getWalletName);
  const amounts = useSelector(getWalleAmounts);
  const rates = useSelector(getUsdRates);
  const tokens = useSelector(getDisplayedTokens);
  const tokensRecord = useSelector(getSupportedTokensRecord);
  const view = useSelector(getCurrentView);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    drower: false,
  });

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

  const drowerMenu =
    <div
      className={css('DrowerMenu')}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[WalletView.Balance, WalletView.Add, WalletView.Manage].map((text, index) => (
          <ListItem className={css('DrowerMenu-Item')} button key={text} onClick={() => dispatch(walletActions.menu(text))}>
            <ListItemIcon className={css('DrowerMenu-ItemIcon')}>
              {[<AttachMoneyOutlinedIcon />, <AddOutlinedIcon />, <BuildOutlinedIcon />][index]}
            </ListItemIcon>
            <ListItemText className={css('DrowerMenu-ItemText')} primary={text} />
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
    </div >;

  const components = () => {
    switch (view) {
      case WalletView.Add:
        return <Add />
      case WalletView.Manage:
        return <Manage />
      case WalletView.About:
        return <AboutPage showBackButton={false} />
      default:
        return <Balance amounts={amounts} rates={rates} tokens={tokens[name]} tokensRecord={tokensRecord} />
    }
  }

  useEffect(() => {
    dispatch(walletActions.openWallet());
  }, [dispatch]);

  return (
    <div className={css()} data-testid={test()}>
      <AppBar position="static" className={css('AppBar')}>
        <Toolbar>
          <IconButton
            className={css('MenuButton')}
            onClick={toggleDrawer()}
            color="inherit"
            aria-label="menu"
            edge="start"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={css('Title')}>
            {name}
          </Typography>

          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className={css('Wrapper')}>
        {components()}
      </div>

      <SwipeableDrawer
        open={state['drower']}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {drowerMenu}
      </SwipeableDrawer>
    </div>
  )
};