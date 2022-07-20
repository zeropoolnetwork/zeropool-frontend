// tslint:disable: prettier max-line-length
import { AppBar, Backdrop, CircularProgress, IconButton, Toolbar, Tooltip, Input, SwipeableDrawer, Dialog, DialogContent, Paper, Typography } from '@mui/material'
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

import { selectBackdrop, selectDeposit, selectReadiness, selectInitials, selectMinting, selectPrivateAddress, selectPrivateBalance, selectPublicBalance, selectTokenBalance, selectTransfer, selectWalletAddress, selectWithdraw, selectRecovery, selectTransferModal, selectCanMint, selectCanWithdraw, selectCanDeposit, selectCanTransfer } from 'wallet/state/demo.selectors'
import { demoActions } from 'wallet/state/demo.reducer'
import { DemoDrowler } from 'wallet/components/DemoDrowler/DemoDrowler'
import { DemoHeader } from 'wallet/components/DemoHeader/DemoHeader'
import { Recovery } from 'wallet/components/Recovery/Recovery'
import { Transfer } from 'wallet/components/Transfer/Transfer'
import { TransferData } from 'shared/models'
import { lowBalanceHelper } from 'wallet/state/helpers/low-balance.helper'
// tslint:enable: prettier max-line-length

export const componentId = 'DemoPage'

const bem = cn(componentId)

export const DemoPage: React.FC<{}> = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const backdrop = useSelector(selectBackdrop)
  const minting = useSelector(selectMinting)
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
  const canMint = useSelector(selectCanMint)
  const canWithdraw = useSelector(selectCanWithdraw)
  const canDeposit = useSelector(selectCanDeposit)
  const canTransfer = useSelector(selectCanTransfer)

  const [mintAmount, setMintAmount] = useState('')
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [drowler, setDrowler] = useState(false)
  const [lowBalance, setLowBalance] = useState(true)

  useEffect(() => {
    if (!readiness && !initials) {
      navigate('/register')
    } else {
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
              walletAddress={backdrop ? '-' : walletAddress}
              privateAddress={backdrop ? '-' : privateAddress}
              publicBalance={backdrop ? '0' : publicBalance}
              privateBalance={backdrop ? '0' : privateBalance}
              tokenBalance={backdrop ? '0' : tokenBalance}
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
            disabled={!canDeposit || badAmount(depositAmount) || +depositAmount > (tokenBalance || 0)}
            onClick={() => { dispatch(demoActions.deposit(depositAmount)); setDepositAmount('') }}
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
            disabled={!canWithdraw || badAmount(withdrawAmount) || +withdrawAmount > (privateBalance || 0)}
            onClick={() => { dispatch(demoActions.withdraw(withdrawAmount)); setWithdrawAmount('') }}
          >
            Withdraw
          </LoadingButton>
        </div>

        <LoadingButton
          loading={false}
          className={bem('Button', { Transfer: true })}
          data-testid={bem('TransferButton')}
          loadingPosition="start"
          color="primary"
          variant="contained"
          startIcon={transfer ? <CircularProgress color="inherit" size={20} /> : <KeyboardDoubleArrowRight />}
          disabled={false}
          onClick={() => dispatch(demoActions.transferModal(true))}
        >
          Transfer
        </LoadingButton>
      </div>

      <Paper className={bem('Info')} elevation={2}>
        <Typography variant="h6" className={bem('InfoTitle')}>🚀 Plonk test</Typography>

        <div className={bem('Transaction', { Mint: true })}>
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
            onClick={() => { dispatch(demoActions.mint(mintAmount)); setMintAmount('') }}
          >
            Mint
          </LoadingButton>
        </div>

        <span className={bem('InfoText')}>To perform any action on this page you need to have enough funds on your public balance.</span>

        <span className={bem('InfoText')}>
          Click on your public address and use it on the&nbsp;
          <a href='https://gitter.im/kovan-testnet/faucet#' target={'_blank'}>Kovan Faucet</a> or&nbsp;
          <a href='https://ethdrop.dev/' target={'_blank'}>Ethdrop</a> page to get free funds.
        </span>
      </Paper>

      <div className={bem('Footer')}>
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
            dispatch(demoActions.resetAccount(null))
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

      <Dialog
        open={recorevery}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogContent dividers={true}>
          <Recovery
            data-testid={bem('Recovery')}
            onReset={() => { dispatch(demoActions.resetAccount(null)); navigate('/register') }}
            onRecover={(password: string) => dispatch(demoActions.recoverWallet(password))}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={transferModal}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogContent dividers={true}>
          <Transfer
            data-testid={bem('Transfer')}
            processing={transfer}
            canTransfer={!!canTransfer}
            onSubmit={(data: TransferData) => dispatch(demoActions.transfer(data))}
            onCancel={() => dispatch(demoActions.transferModal(false))}
            onChange={(type, amount) => { setLowBalance(lowBalanceHelper(type, amount, publicBalance, tokenBalance, privateBalance)) }}
            balanceError={lowBalance}
          />
        </DialogContent>
      </Dialog>

      <Backdrop sx={{ color: '#fff', zIndex: 1000 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
