// tslint:disable: prettier max-line-length
import { AppBar, Backdrop, CircularProgress, IconButton, Toolbar, Tooltip, Input, Box, SwipeableDrawer, Dialog, DialogContent } from '@mui/material'
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

import { selectBackdrop, selectDeposit, selectReadiness, selectInitials, selectMinting, selectPrivateAddress, selectPrivateBalance, selectPublicBalance, selectTokenBalance, selectTransfer, selectWalletAddress, selectWithdraw, selectRecovery } from 'wallet/state/demo.selectors'
import { demoActions } from 'wallet/state/demo.reducer'
import { DemoDrowler } from 'wallet/components/DemoDrowler/DemoDrowler'
import { DemoHeader } from 'wallet/components/DemoHeader/DemoHeader'
import { Recovery } from 'wallet/components/Recovery/Recovery'
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

  const [mintAmount, setMintAmount] = useState('')
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [transferTo, setTransferTo] = useState('')
  const [drowler, setDrowler] = useState(false)


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
    if (  
      event?.type === 'keydown'
      &&
      (event as React.KeyboardEvent).key !== 'Escape'
    ){
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
              publicBalance={backdrop ? 0 : publicBalance}
              privateBalance={backdrop ? 0 : privateBalance}
              tokenBalance={backdrop ? 0 : tokenBalance}
            />
          </div>
        </Toolbar>
      </AppBar>

      <div className={bem('Wrapper')}>
        <div>
          <Input
            id="mint-amount"
            className={bem('Mint')}
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
            data-testid={bem('Mint')}
            startIcon={<SoupKitchenIcon />}
            disabled={minting || badAmount(mintAmount)}
            onClick={() => { dispatch(demoActions.mint(mintAmount)); setMintAmount('') }}
          >
            Mint
          </LoadingButton>
        </div>

        <div>
          <Input
            id="deposit-amount"
            className={bem('Deposit')}
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
            loadingPosition="start"
            color="primary"
            variant="contained"
            className={bem('Button')}
            data-testid={bem('Import')}
            startIcon={<KeyboardArrowRightIcon />}
            disabled={deposit || withdraw || transfer || badAmount(depositAmount) || +depositAmount > (tokenBalance || 0)}
            onClick={() => { dispatch(demoActions.deposit(depositAmount)); setDepositAmount('') }}
          >
            Deposit
          </LoadingButton>
        </div>

        <div>
          <Input
            color="primary"
            id="withdraw-amount"
            className={bem('Withdraw')}
            sx={{ color: 'black' }}
            placeholder="Withdraw amount in tokens"
            classes={{ input: bem('Withdraw') }}
            value={withdrawAmount}
            inputProps={{ 'data-testid': bem('Withdraw'), maxLength: 20 }}
            onChange={(event) => setWithdrawAmount(event.target.value)}
          />

          <LoadingButton
            loading={withdraw}
            loadingPosition="start"
            color="primary"
            variant="contained"
            className={bem('Button')}
            data-testid={bem('Withdraw')}
            startIcon={<KeyboardArrowLeft />}
            disabled={deposit || withdraw || transfer || badAmount(withdrawAmount) || +withdrawAmount > (privateBalance || 0)}
            onClick={() => { dispatch(demoActions.withdraw(withdrawAmount)); setWithdrawAmount('') }}
          >
            Withdraw
          </LoadingButton>
        </div>

        <Box className={bem('Transfer')}>
          <div>
            <Input
              className={bem('TransferTo')}
              sx={{ color: 'black' }}
              color="primary"
              value={transferTo}
              placeholder="Recipient private address"
              classes={{ input: bem('TransferTo') }}
              inputProps={{ 'data-testid': bem('TransferTo'), maxLength: 120 }}
              onChange={(event) => setTransferTo(event.target.value)}
            />
          </div>

          <div>
            <Input
              className={bem('TransferAmount')}
              sx={{ color: 'black' }}
              color="primary"
              value={transferAmount === '0' ? '' : transferAmount}
              placeholder="Transfer amount in tokens"
              classes={{ input: bem('TransferAmount') }}
              inputProps={{ 'data-testid': bem('TransferAmount'), maxLength: 20 }}
              onChange={(event) => setTransferAmount(event.target.value)}
            />

            <LoadingButton
              loading={transfer}
              loadingPosition="start"
              color="primary"
              variant="contained"
              className={bem('Button')}
              data-testid={bem('Withdraw')}
              startIcon={<KeyboardDoubleArrowRight />}
              disabled={deposit || withdraw || transfer || badAmount(transferAmount) || +transferAmount > (privateBalance || 0)}
              onClick={() => {
                dispatch(demoActions.transfer({ to: transferTo, tokens: transferAmount }))
                setTransferAmount('')
              }}
            >
              Transfer
            </LoadingButton>
          </div>
        </Box>
      </div>

      <div className={bem('Info')}>
        <span>To perform any action you need to have enough funds on your public balance.</span>
        <span>
          Click on your public address and use it on the&nbsp; 
          <a href='https://gitter.im/kovan-testnet/faucet#' target={'_blank'}>Kovan Faset</a> or&nbsp; 
          <a href='https://ethdrop.dev/' target={'_blank'}>Ethdrop</a> page to get free funds.
        </span>
      </div>

      <div className={bem('Footer')}>
        <img src={logo} alt="ZeroPool" style={{ margin: 'auto', height: '60px' }} />
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
        // onClose={() => setRecoveryDialog(false)}
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

      <Backdrop sx={{ color: '#fff', zIndex: 1000 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
