import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
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
  Divider,
} from '@mui/material'
import {
  AttachMoneyOutlined,
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

import './WalletPage.scss'

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
  selectSeed,
  getPrivateAddress,
  getProcessing,
} from 'wallet/state/wallet.selectors'
import { Wallets, WalletsHandlers } from 'wallet/components/Wallets/Wallets'
import { SendConfirmation } from 'wallet/components/SendConfirmation/SendConfirmation'
import { WalletHeaderMode } from 'wallet/components/WalletHeader/WalletHeaderMode'
import { walletActions } from 'wallet/state/wallet.actions'
import { WalletHeader } from 'wallet/components/WalletHeader/WalletHeader'
import { Transactions } from 'wallet/containers/Transactions/Transactions'
import { WalletView } from 'wallet/state/models/wallet-view'
import { Balance } from 'wallet/components/Balance/Balance'
import { Receive } from 'wallet/components/Receive/Receive'
import { Wallet } from 'wallet/state/models/wallet'
import { Send } from 'wallet/components/Send/Send'
import { total } from 'wallet/state/helpers/total.helper'

export const componentId = 'WalletPage'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type WalletPageProps = {}

export const WalletPage: React.FC<WalletPageProps> = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = useState({ Drower: false })
  const dispatch = useDispatch()
  const view = useSelector(getActiveView)
  const token = useSelector(getActiveToken)
  const rates = useSelector(getUsdRates)
  const tokens = useSelector(getSupportedTokens)
  const amounts = useSelector(getAmounts) || {}
  const tokensRecord = useSelector(getSupportedTokensRecord)
  const wallet = useSelector(getActiveWallet)
  const wallets = useSelector(getWalletsForActiveToken)
  const send = useSelector(getSendData)
  const seed = useSelector(selectSeed)
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

  const toggleDrawer = (open?: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setState({ ...state, Drower: open === undefined ? !state.Drower : open })
  }

  const drowerMenu = () => (
    <div
      className={css('Drower')}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[WalletView.Balance, WalletView.Reset].map((text, index) => (
          <ListItem
            className={css('DrowerItem')}
            button={true}
            key={text}
            onClick={() => dispatch(walletActions.menu(text))}
          >
            <ListItemIcon className={css('DrowerItemIcon')}>
              {
                [<AttachMoneyOutlined key={index} />, <BuildOutlined key={index} />][
                index
                ]
              }
            </ListItemIcon>
            <ListItemText className={css('DrowerItemText')} primary={text} />
          </ListItem>
        ))}

        <ListItem className={css('DrowerItem')} button={true} onClick={handleExportSeed}>
          <ListItemIcon className={css('DrowerItemIcon')}>
            <FileCopy />
          </ListItemIcon>
          <ListItemText className={css('DrowerItemText')} primary="Export Seed" />
        </ListItem>
      </List>

      <Divider />

      <List>
        {[WalletView.Help, WalletView.About].map((text, index) => (
          <ListItem
            button={true}
            key={text}
            onClick={() => dispatch(walletActions.menu(text))}
          >
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
            getPrivateAddress={(_token) =>
              dispatch(walletActions.getPrivateAddress(_token))
            }
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
            getPrivateAddress={(_token) =>
              dispatch(walletActions.getPrivateAddress(_token))
            }
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

  useEffect(() => {
    if (!seed) {
      navigate('/register')
      // navigate(0)
    } else {
      dispatch(walletActions.initWallets())
    }
  }, [dispatch, seed])

  return (
    <div className={css('')} data-testid={test()} id={componentId}>
      <AppBar position="static" className={css('AppBar')}>
        <Toolbar className={css('Toolbar')}>
          <div className={css('ToolbarHeader')}>
            <IconButton
              onClick={toggleDrawer()}
              color="inherit"
              aria-label="menu"
              edge="start"
              sx={{ padding: '12px' }}
            >
              <Menu />
            </IconButton>

            <div className={css('ToolbarHeaderItems')}>
              <Tooltip title="No new messages" placement="bottom">
                <IconButton
                  color="inherit"
                  className={css('zeroPaddingRight')}
                  sx={{ padding: '12px 0px' }}
                >
                  <Badge badgeContent={0} color="secondary">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Update balances" placement="bottom">
                <IconButton
                  color="inherit"
                  onClick={() => dispatch(walletActions.updateBalances())}
                  sx={{ padding: '12px' }}
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <div className={css('ToolbarBody')}>
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
              publicBalance={token ? amounts[token.symbol] : undefined}
              tokenSymbol={token?.symbol}
              tokenName={token?.name}
              onBackClick={() => dispatch(walletActions.headerBack())}
            />
          </div>
        </Toolbar>
      </AppBar>

      <div className={css('Wrapper')}>{actualView()}</div>

      <div className={css('Footer')}>
        <img src={logo} alt="ZeroPool" style={{ margin: 'auto' }} />
      </div>

      <SwipeableDrawer
        open={state.Drower}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {drowerMenu()}
      </SwipeableDrawer>
    </div>
  )
}
