import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@mui/styles'
import { cn } from '@bem-react/classname'
import {
  AppBar,
  Toolbar,
  IconButton,
  SwipeableDrawer,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'
import {
  AttachMoneyOutlined,
  SafetyDivider,
  Notifications,
  BuildOutlined,
  InfoOutlined,
  HelpOutline,
  FileCopy,
  Refresh,
  Menu,
} from '@mui/icons-material'

import logo from 'assets/images/logo1.svg'
import { Token } from 'shared/models/token'
import { HelpPage } from 'shared/components/HelpPage/HelpPage'
import { AboutPage } from 'shared/components/AboutPage/AboutPage'
import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'

import {
  getActiveToken,
  getActiveView,
  getSupportedTokens,
  getSupportedTokensRecord,
  getUsdRates,
  getAmounts,
  getWalletsForActiveToken,
  getActiveWallet,
  getSendData,
  getSeed,
  getPrivateAddress,
  getProcessing,
} from 'wallet/state/wallet.selectors'
import { Wallets, WalletsHandlers } from 'wallet/components/Wallets/Wallets'
import { SendConfirmation } from 'wallet/components/SendConfirmation/SendConfirmation'
import { WalletHeaderMode } from 'wallet/components/WalletHeader/WalletHeaderMode'
import { walletActions } from 'wallet/state/wallet.actions'
import { WalletHeader } from 'wallet/components/WalletHeader/WalletHeader'
import { total } from 'wallet/state/helpers/total.helper'
import { WalletView } from 'wallet/state/models/wallet-view'
import { Balance } from 'wallet/components/Balance/Balance'
import { Receive } from 'wallet/components/Receive/Receive'
import { Wallet } from 'wallet/state/models/wallet'
import { Send } from 'wallet/components/Send/Send'
import { Transactions } from 'wallet/containers/Transactions/Transactions'

export const componentId = 'WalletPage'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type WalletPageProps = {}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    flexGrow: 1,
    flexDirection: 'column',
    display: 'flex',
    height: '100vh',
    minWidth: '350px',
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
    marginRight: '-15px',
  },
  toolbarHeaderItemsEdgeStart: {
    marginLeft: '-15px',
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
  footer: {
    backgroundColor: '#020941',
    bottom: 0,
    display: 'flex',
    position: 'fixed',
    height: '70px',
    width: '100%',
  },
  AboutPage: {
    height: '50vh',
  },
  zeroPaddingRight: {
    paddingRight: '0',
  },
}))

export const WalletPage: React.FC<WalletPageProps> = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = useState({ drower: false })
  const dispatch = useDispatch()
  const classes = useStyles()
  const view = useSelector(getActiveView)
  const token = useSelector(getActiveToken)
  const rates = useSelector(getUsdRates)
  const tokens = useSelector(getSupportedTokens)
  const amounts = useSelector(getAmounts) || {}
  const tokensRecord = useSelector(getSupportedTokensRecord)
  const wallet = useSelector(getActiveWallet)
  const wallets = useSelector(getWalletsForActiveToken)
  const send = useSelector(getSendData)
  const seed = useSelector(getSeed)
  const privateAddress = useSelector(getPrivateAddress)
  const processing = useSelector(getProcessing)

  const handleExportSeed = () => {
    navigator.clipboard.writeText(seed || 'No seed set').then(
      () => {
        enqueueSnackbar('Seed copied to the clipboard', { variant: 'success' })
      },
      (err) => {
        enqueueSnackbar(`Can't access clipboard`, { variant: 'error' })
      },
    )
  }

  const toggleDrawer = (open?: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
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
        {[WalletView.Balance, WalletView.Reset].map((text, index) => (
          <ListItem
            className={classes.drowerItem}
            button={true}
            key={text}
            onClick={() => dispatch(walletActions.menu(text))}
          >
            <ListItemIcon className={classes.drowerItemIcon}>
              {[<AttachMoneyOutlined key={index} />, <BuildOutlined key={index} />][index]}
            </ListItemIcon>
            <ListItemText className={classes.drowerItemText} primary={text} />
          </ListItem>
        ))}

        <ListItem className={classes.drowerItem} button={true} onClick={handleExportSeed}>
          <ListItemIcon className={classes.drowerItemIcon}>
            <FileCopy />
          </ListItemIcon>
          <ListItemText className={classes.drowerItemText} primary="Export Seed" />
        </ListItem>
      </List>

      <SafetyDivider />

      <List>
        {[WalletView.Help, WalletView.About].map((text, index) => (
          <ListItem button={true} key={text} onClick={() => dispatch(walletActions.menu(text))}>
            <ListItemIcon className={css('DrowerMenu-ItemIcon')}>
              {[<InfoOutlined key={index} />, <HelpOutline key={index} />][index]}
            </ListItemIcon>
            <ListItemText className={css('DrowerMenu-ItemText')} primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  const walletsButtonHandlers: WalletsHandlers = {
    onReceive: (_wallet: Wallet) => dispatch(walletActions.openReceiveView(_wallet)),
    onSend: (_wallet: Wallet) => dispatch(walletActions.openSendInitialView(_wallet)),
    onRename: (_wallet: Wallet, name: string) =>
      dispatch(walletActions.edit({ wallet: _wallet, name })),
    onDelete: (_wallet: Wallet) => dispatch(walletActions.hideWallet(_wallet)),
    onAdd: () => dispatch(walletActions.addWallet()),
    onOpen: (_wallet: Wallet) => dispatch(walletActions.openTransactionsView(_wallet)),
  }

  const actualView = () => {
    switch (view) {
      case WalletView.Wallets:
        return token ? (
          <Wallets
            handlers={walletsButtonHandlers}
            rate={rates[token.symbol]}
            token={token}
            wallets={wallets ? Object.values(wallets) : []}
            getPrivateAddress={(_token) => dispatch(walletActions.getPrivateAddress(_token))}
          />
        ) : null
      case WalletView.Send:
        return wallet && token ? (
          <Send
            rate={rates[token.symbol]}
            wallet={wallet}
            onNextClick={(address, amount) =>
              dispatch(
                walletActions.prepareSendConfirmView({
                  wallet,
                  address,
                  amount,
                }),
              )
            }
          />
        ) : null
      case WalletView.SendConfirmation:
        return send && token && wallet ? (
          <SendConfirmation
            amount={send.amount}
            address={send.address}
            fee={send.fee}
            processing={processing.send}
            rate={rates[token.symbol]}
            wallet={wallet}
            onConfirmClick={() => dispatch(walletActions.send())}
          />
        ) : null
      case WalletView.Receive:
        return wallet && token ? (
          <Receive
            address={wallet.address}
            token={token}
            getPrivateAddress={(_token) => dispatch(walletActions.getPrivateAddress(_token))}
            privateAddress={privateAddress}
          />
        ) : null
      case WalletView.Transactions:
        return wallet ? <Transactions wallet={wallet} /> : null
      case WalletView.About:
        return <AboutPage showBackButton={false} />
      case WalletView.Help:
        return <HelpPage />
      default:
        return (
          <Balance
            amounts={amounts}
            onSelectToken={(t: Token) => dispatch(walletActions.openWalletsView(t))}
            rates={rates}
            tokens={tokens.map((i) => i.symbol)}
            tokensRecord={tokensRecord}
          />
        )
    }
  }

  const walletHeaderMode = [WalletView.Help, WalletView.About].includes(view)
    ? WalletHeaderMode.Info
    : WalletHeaderMode.Balance

  const walletHeaderLabels: Record<WalletView, string> = {
    [WalletView.Balance]: 'Overall balance',
    [WalletView.Wallets]: `${token?.name} wallets`,
    [WalletView.Receive]: `${wallet?.name}`,
    [WalletView.Send]: `${wallet?.name}`,
    [WalletView.SendConfirmation]: `${wallet?.name}`,
    [WalletView.Transactions]: `${wallet?.name}`,
    [WalletView.About]: 'About',
    [WalletView.Help]: 'Help',
    [WalletView.Reset]: '',
  }

  useEffect(() => {
    dispatch(walletActions.openBalanceView())
  }, [dispatch])

  return (
    <div className={css('', [classes.root])} data-testid={test()} id={componentId}>
      <AppBar position="static" className={css('AppBar')}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.toolbarHeader}>
            <IconButton
              classes={{ edgeStart: classes.toolbarHeaderItemsEdgeStart }}
              onClick={toggleDrawer()}
              color="inherit"
              aria-label="menu"
              edge="start"
            >
              <Menu />
            </IconButton>

            <div className={classes.toolbarHeaderItems}>
              <Tooltip title="No new messages" placement="bottom">
                <IconButton color="inherit" className={classes.zeroPaddingRight}>
                  <Badge badgeContent={0} color="secondary">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Update balances" placement="bottom">
                <IconButton
                  color="inherit"
                  onClick={() => dispatch(walletActions.updateBalances())}
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <div className={classes.toolbarBody}>
            <WalletHeader
              mode={walletHeaderMode}
              label={walletHeaderLabels[view]}
              hideBackButton={view === WalletView.Balance}
              priv={!!wallet && !wallet.address}
              fiatValue={
                walletHeaderMode === WalletHeaderMode.Info
                  ? undefined
                  : total(amounts, rates, token?.symbol)
              }
              tokenAmount={token ? amounts[token.symbol] : undefined}
              tokenSymbol={token?.symbol}
              tokenName={token?.name}
              onBackClick={() => dispatch(walletActions.headerBack())}
            />
          </div>
        </Toolbar>
      </AppBar>

      <div className={css('Wrapper', [classes.wrapper])}>{actualView()}</div>

      <div className={css('Footer', [classes.footer])}>
        <img src={logo} alt="ZeroPool" style={{ margin: 'auto' }} />
      </div>

      <SwipeableDrawer
        open={state.drower}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {drowerMenu()}
      </SwipeableDrawer>
    </div>
  )
}
