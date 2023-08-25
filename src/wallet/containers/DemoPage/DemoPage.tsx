// tslint:disable: prettier max-line-length
import {
  AppBar,
  Backdrop,
  CircularProgress,
  IconButton,
  Toolbar,
  Tooltip,
  Input,
  SwipeableDrawer,
  Dialog,
  DialogContent,
  Paper,
  Typography,
  Button,
} from '@mui/material'
import RestoreIcon from '@mui/icons-material/Restore'
import { useDispatch, useSelector } from 'react-redux'
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight'
import { useEffect, useState } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import { Refresh, Menu } from '@mui/icons-material'
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import { cn } from '@bem-react/classname'

import './DemoPage.scss'
import logo from 'assets/images/logo1.svg'
import { badAmount } from 'shared/utils/bad-amount'
import { TransferData } from 'shared/models'
import {
  version as VERSION,
  supportVersion as SUPPORT,
  clientVersion as CLIENT,
} from 'index'

import {
  selectBackdrop,
  selectDeposit,
  selectReadiness,
  selectInitials,
  selectMinting,
  selectPrivateAddress,
  selectPrivateBalance,
  selectPublicBalance,
  selectTokenBalance,
  selectTransfer,
  selectWalletAddress,
  selectWithdraw,
  selectRecovery,
  selectTransferModal,
  selectCanMint,
  selectCanWithdraw,
  selectCanDeposit,
  selectCanTransfer,
  selectTransactionLogModal,
  selectTransactions,
} from 'wallet/state/demo.selectors'
import { NETWORK, NETWORK_FAUCET, NETWORK_NAME, zpSupport } from 'wallet/api/zeropool.api'
import { lowBalanceHelper } from 'wallet/state/helpers/low-balance.helper'
import { Transactions } from 'wallet/containers/Transactions/Transactions'
import { demoActions } from 'wallet/state/demo.reducer'
import { DemoDrowler } from 'wallet/components/DemoDrowler/DemoDrowler'
import { DemoHeader } from 'wallet/components/DemoHeader/DemoHeader'
import { Recovery } from 'wallet/components/Recovery/Recovery'
import { Transfer } from 'wallet/components/Transfer/Transfer'
import { RootState } from 'state'
import { Fauset } from 'wallet/containers/Fauset/Fauset'
// tslint:enable: prettier max-line-length

export const componentId = 'DemoPage'

const bem = cn(componentId)

export const DemoPage: React.FC<{}> = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const backdrop = useSelector(selectBackdrop)
  const minting = useSelector((state: RootState) => state.demo.minting)
  const initials = useSelector(selectInitials)
  const publicBalance = useSelector(selectPublicBalance)
  const privateBalance = useSelector(selectPrivateBalance)
  const tokenBalance = useSelector(selectTokenBalance)
  const walletAddress = useSelector(selectWalletAddress)
  const privateAddress = useSelector(selectPrivateAddress)
  const deposit = useSelector(selectDeposit)
  const withdraw = useSelector(selectWithdraw)
  const transfer = useSelector(selectTransfer)
  const readiness = useSelector(selectReadiness)
  const recorevery = useSelector(selectRecovery)
  const transferModal = useSelector(selectTransferModal)
  const transactionsModal = useSelector(selectTransactionLogModal)
  const canMint = useSelector(selectCanMint)
  const canWithdraw = useSelector(selectCanWithdraw)
  const canDeposit = useSelector(selectCanDeposit)
  const canTransfer = useSelector(selectCanTransfer)
  const transactions = useSelector(selectTransactions)

  const [mintAmount, setMintAmount] = useState('')
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [drowler, setDrowler] = useState(false)
  const [lowBalance, setLowBalance] = useState(true)

  useEffect(() => {
    if (!readiness && !initials) {
      navigate('/register')
    } else if (!zpSupport) {
      dispatch(demoActions.initApi(null))
    }
  }, [])

  const toggleDrawer = (open?: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (event?.type === 'keydown' && (event as React.KeyboardEvent).key !== 'Escape') {
      return
    }

    setDrowler(open === undefined ? !drowler : open)
  }

  const closeDrawer = () => toggleDrawer(false)(false as any)

  return (
    <div className={bem('')} data-testid={bem()} id={componentId}>
      <AppBar position="static" className={bem('AppBar')}>
        <Toolbar className={bem('Toolbar')}>
          <div className={bem('ToolbarHeader')}>
            <IconButton
              onClick={toggleDrawer()}
              color="inherit"
              aria-label="menu"
              edge="start"
              sx={{ padding: '12px' }}
            >
              <Menu />
            </IconButton>

            <div className={bem('ToolbarHeaderItems')}>
              <Tooltip title="Update balances" placement="bottom">
                <IconButton
                  color="inherit"
                  onClick={() => dispatch(demoActions.updateBalances(null))}
                  sx={{ padding: '12px' }}
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <div className={bem('ToolbarBody')}>
            <DemoHeader
              walletAddress={backdrop || recorevery ? '-' : walletAddress}
              privateAddress={backdrop || recorevery ? '-' : privateAddress}
              publicBalance={backdrop || recorevery ? '-' : publicBalance}
              privateBalance={backdrop || recorevery ? '-' : privateBalance}
              tokenBalance={backdrop || recorevery ? '-' : tokenBalance}
            />
          </div>
        </Toolbar>
      </AppBar>

      <div className={bem('Wrapper')}>
        <div className={bem('Transaction')}>
          <Input
            id="deposit-amount"
            className={bem('Input')}
            data-testid={bem('DepositInput')}
            sx={{ color: 'black' }}
            color="primary"
            value={depositAmount}
            classes={{ input: bem('DepositInput') }}
            placeholder="Deposit amount in tokens"
            inputProps={{ 'data-testid': bem('Deposit'), maxLength: 20 }}
            onChange={(event) => setDepositAmount(event.target.value)}
          />

          <LoadingButton
            loading={deposit}
            className={bem('Button')}
            data-testid={bem('DepositButton')}
            loadingPosition="start"
            color="primary"
            variant="contained"
            startIcon={<KeyboardArrowRightIcon />}
            disabled={
              !canDeposit ||
              badAmount(depositAmount) ||
              +depositAmount > +(tokenBalance || 0)
            }
            onClick={() => {
              dispatch(demoActions.deposit(depositAmount))
              setDepositAmount('')
            }}
          >
            Deposit
          </LoadingButton>
        </div>

        <div className={bem('Transaction')}>
          <Input
            color="primary"
            className={bem('Input')}
            data-testid={bem('WithdrawInput')}
            id="withdraw-amount"
            sx={{ color: 'black' }}
            placeholder="Withdraw amount in tokens"
            classes={{ input: bem('Withdraw') }}
            value={withdrawAmount}
            inputProps={{ 'data-testid': bem('Withdraw'), maxLength: 20 }}
            onChange={(event) => setWithdrawAmount(event.target.value)}
          />

          <LoadingButton
            loading={withdraw}
            className={bem('Button')}
            data-testid={bem('WithdrawButton')}
            loadingPosition="start"
            color="primary"
            variant="contained"
            startIcon={<KeyboardArrowLeft />}
            disabled={
              !canWithdraw ||
              badAmount(withdrawAmount) ||
              +withdrawAmount > +(privateBalance || 0)
            }
            onClick={() => {
              dispatch(demoActions.withdraw(withdrawAmount))
              setWithdrawAmount('')
            }}
          >
            Withdraw
          </LoadingButton>
        </div>
        <div className={bem('Buttons')}>
          <LoadingButton
            loading={false}
            className={bem('Button', { Transfer: true })}
            data-testid={bem('TransferButton')}
            loadingPosition="start"
            color="primary"
            variant="contained"
            startIcon={
              transfer ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <KeyboardDoubleArrowRight />
              )
            }
            disabled={false}
            onClick={() => dispatch(demoActions.transferModal(true))}
          >
            Transfer
          </LoadingButton>

          <Button
            variant="contained"
            color="primary"
            className={bem('Button', { Log: true })}
            startIcon={<RestoreIcon />}
            onClick={() => dispatch(demoActions.transactionsModal(true))}
          >
            History
          </Button>
        </div>
      </div>

      <div style={{ flex: 1 }}></div>

      {NETWORK === 'near' ? <Fauset></Fauset> : null}

      <Paper className={bem('Info')} elevation={2}>
        {NETWORK !== 'near' ? (
          <div className={bem('Transaction', { Mint: true })}>
            <Typography variant="h6" className={bem('InfoTitle')}>
              🚀 Mint test token
            </Typography>

            <Input
              id="mint-amount"
              className={bem('Input')}
              data-testid={bem('MintInput')}
              sx={{ color: 'black' }}
              color="primary"
              value={mintAmount}
              classes={{ input: bem('MintInput') }}
              placeholder="Mint amount in tokens"
              inputProps={{ 'data-testid': bem('Mint'), maxLength: 20 }}
              onChange={(event) => setMintAmount(event.target.value)}
            />

            <LoadingButton
              loading={minting}
              loadingPosition="start"
              color="primary"
              variant="contained"
              className={bem('Button')}
              data-testid={bem('MintButton')}
              startIcon={<SoupKitchenIcon />}
              disabled={!canMint || badAmount(mintAmount)}
              onClick={() => {
                dispatch(demoActions.mint(mintAmount))
                setMintAmount('')
              }}
            >
              Mint
            </LoadingButton>
          </div>
        ) : null}

        <span className={bem('InfoText')}>
          To perform any action on this page you need to have enough funds. Request them
          using faucet if you don't have any.
        </span>

        {NETWORK !== 'near' ? (
          <span className={bem('InfoText')}>
            Click on your public address and use it on our or on the&nbsp;
            {/* <a href='https://fauceth.komputing.org/?chain=5' target={'_blank'}>Goerli Faucet</a> or&nbsp; */}
            <a href={NETWORK_FAUCET} target={'_blank'} rel="noreferrer">
              {NETWORK_NAME} Faucet
            </a>{' '}
            page to get free funds.
          </span>
        ) : null}
      </Paper>

      <div className={bem('Footer')}>
        <div className={bem('Version1')}>{`wallet v${VERSION}`}</div>
        <div className={bem('Version2')}>{`client v${CLIENT}`}</div>
        <div className={bem('Version3')}>{`support v${SUPPORT}`}</div>
        <img className={bem('Logo')} src={logo} alt="ZeroPool" />
      </div>

      <SwipeableDrawer
        open={drowler}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <DemoDrowler
          toggle={toggleDrawer()}
          reset={() => {
            dispatch(demoActions.resetAccount(true))
            navigate('/register')
            closeDrawer()
          }}
          cancelReset={closeDrawer}
          exportSeed={(password: string) => {
            dispatch(demoActions.exportSeed(password))
            closeDrawer()
          }}
          cancelExport={closeDrawer}
        ></DemoDrowler>
      </SwipeableDrawer>

      <Dialog open={recorevery} fullWidth={true} maxWidth={'xs'}>
        <DialogContent dividers={true}>
          <Recovery
            data-testid={bem('Recovery')}
            onReset={() => {
              dispatch(demoActions.resetAccount(true))
              navigate('/register')
            }}
            onRecover={(password: string) =>
              dispatch(demoActions.recoverWallet(password))
            }
          />
        </DialogContent>
      </Dialog>

      <Dialog open={transferModal} fullWidth={true} maxWidth={'xs'}>
        <DialogContent dividers={true}>
          <Transfer
            data-testid={bem('Transfer')}
            processing={transfer}
            canTransfer={!!canTransfer}
            onSubmit={(data: TransferData) => dispatch(demoActions.transfer(data))}
            onCancel={() => dispatch(demoActions.transferModal(false))}
            onEdit={(type, amount) => {
              setLowBalance(
                lowBalanceHelper(
                  type,
                  amount,
                  publicBalance,
                  tokenBalance,
                  privateBalance,
                ),
              )
            }}
            balanceError={lowBalance}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        PaperProps={{
          style: {
            width: '550px',
            margin: '10% 2%',
          },
        }}
        open={transactionsModal}
      >
        <DialogContent>
          <Transactions
            onClose={() => dispatch(demoActions.transactionsModal(false))}
            transactions={transactions}
            address={walletAddress || ''}
          />
        </DialogContent>
      </Dialog>

      <Backdrop sx={{ color: '#fff', zIndex: 1000 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
