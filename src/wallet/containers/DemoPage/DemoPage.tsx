// tslint:disable: prettier max-line-length
import { AppBar, Backdrop, CircularProgress, IconButton, Toolbar, Tooltip, Input, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import KeyboardDoubleArrowRight  from '@mui/icons-material/KeyboardDoubleArrowRight'
import { useEffect, useState } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import { Refresh, Menu } from '@mui/icons-material'
import { testIdBuilder } from 'shared/helpers/test'
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import { cn } from '@bem-react/classname'

import './DemoPage.scss'
import logo from 'assets/images/logo1.svg'
import { badAmount } from 'shared/utils/bad-amount'

import { selectBackdrop, selectDeposit, selectMinting, selectPrivateAddress, selectPrivateBalance, selectPublicBalance, selectTokenBalance, selectTransfer, selectWalletAddress, selectWithdraw } from 'wallet/state/demo.selectors'
import { demoActions } from 'wallet/state/demo.reducer'
import { DemoHeader } from 'wallet/components/DemoHeader/DemoHeader'
import { selectSeed } from 'wallet/state/wallet.selectors'
// tslint:enable: prettier max-line-length

export const componentId = 'DemoPage'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export const DemoPage: React.FC<{}> = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const backdrop = useSelector(selectBackdrop)
  const minting = useSelector(selectMinting)
  const seed = useSelector(selectSeed)
  const publicBalance = useSelector(selectPublicBalance)
  const privateBalance = useSelector(selectPrivateBalance)
  const tokenBalance = useSelector(selectTokenBalance)
  const walletAddress = useSelector(selectWalletAddress)
  const privateAddress = useSelector(selectPrivateAddress)
  const deposit = useSelector(selectDeposit)
  const withdraw = useSelector(selectWithdraw)
  const transfer = useSelector(selectTransfer)

  const [mintAmount, setMintAmount] = useState('')
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [transferTo, setTransferTo] = useState('')

  useEffect(() => {
    if (!seed) {
      navigate('/register')
      // navigate(0)
    } else {
      dispatch(demoActions.initApi(null))
    }
  }, [dispatch, seed])

  return (
    <div className={css('')} data-testid={test()} id={componentId}>
      <AppBar position="static" className={css('AppBar')}>
        <Toolbar className={css('Toolbar')}>
          <div className={css('ToolbarHeader')}>
            <IconButton
              color="inherit"
              aria-label="menu"
              edge="start"
              sx={{ padding: '12px' }}
            >
              <Menu />
            </IconButton>

            <div className={css('ToolbarHeaderItems')}>
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

          <div className={css('ToolbarBody')}>
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

      <div className={css('Wrapper')}>
        <div>
          <Input
            id="mint-amount"
            className={css('Mint')}
            sx={{ color: 'black' }}
            color="primary"
            value={mintAmount}
            classes={{ input: css('MintInput') }}
            placeholder="Mint amount"
            inputProps={{ 'data-testid': test('Mint'), maxLength: 20 }}
            onChange={(event) => setMintAmount(event.target.value)}
          />

          <LoadingButton
            loading={minting}
            loadingPosition="start"
            color="primary"
            variant="contained"
            className={css('Button')}
            data-testid={test('Mint')}
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
            className={css('Deposit')}
            sx={{ color: 'black' }}
            color="primary"
            value={depositAmount}
            classes={{ input: css('DepositInput') }}
            placeholder="Deposit amount"
            inputProps={{ 'data-testid': test('Deposit'), maxLength: 20 }}
            onChange={(event) => setDepositAmount(event.target.value)}
          />

          <LoadingButton
            loading={deposit}
            loadingPosition="start"
            color="primary"
            variant="contained"
            className={css('Button')}
            data-testid={test('Import')}
            startIcon={<KeyboardArrowRightIcon />}
            disabled={deposit || badAmount(depositAmount) || +depositAmount > (tokenBalance || 0)}
            onClick={() => { dispatch(demoActions.deposit(depositAmount)); setDepositAmount('') }}
          >
            Deposit
          </LoadingButton>
        </div>

        <div>
          <Input
            color="primary"
            id="withdraw-amount"
            className={css('Withdraw')}
            sx={{ color: 'black' }}
            placeholder="Withdraw amount in tokens"
            classes={{ input: css('Withdraw') }}
            value={withdrawAmount}
            inputProps={{ 'data-testid': test('Withdraw'), maxLength: 20 }}
            onChange={(event) => setWithdrawAmount(event.target.value)}
          />

          <LoadingButton
            loading={withdraw}
            loadingPosition="start"
            color="primary"
            variant="contained"
            className={css('Button')}
            data-testid={test('Withdraw')}
            startIcon={<KeyboardArrowLeft />}
            disabled={withdraw || badAmount(withdrawAmount) || +withdrawAmount > (privateBalance || 0)}
            onClick={() => { dispatch(demoActions.withdraw(withdrawAmount)); setWithdrawAmount('') }}
          >
            Withdraw
          </LoadingButton>
        </div>

        <Box className={css('Transfer')}>
          <div>
            <Input
              id="transfer-amount"
              className={css('TransferTo')}
              sx={{ color: 'black' }}
              color="primary"
              value={transferTo}
              placeholder="Recipient private address"
              classes={{ input: css('TransferTo') }}
              inputProps={{ 'data-testid': test('TransferTo'), maxLength: 120 }}
              onChange={(event) => setTransferTo(event.target.value)}
            />
          </div>

          <div>
            <Input
              id="transfer-amount"
              className={css('TransferAmount')}
              sx={{ color: 'black' }}
              color="primary"
              value={transferAmount === '0' ? '' : transferAmount}
              placeholder="Transfer amount in tokens"
              classes={{ input: css('TransferAmount') }}
              inputProps={{ 'data-testid': test('TransferAmount'), maxLength: 20 }}
              onChange={(event) => setTransferAmount(event.target.value)}
            />

            <LoadingButton
              loading={transfer}
              loadingPosition="start"
              color="primary"
              variant="contained"
              className={css('Button')}
              data-testid={test('Withdraw')}
              startIcon={<KeyboardDoubleArrowRight />}
              disabled={transfer || badAmount(transferAmount) || +transferAmount > (privateBalance || 0)}
              onClick={() => {
                dispatch(demoActions.transfer({to: transferTo, tokens: transferAmount}))
                setTransferAmount('')
              }}
            >
              Transfer
            </LoadingButton>
          </div>  
        </Box>
      </div>

      <div className={css('Info')}>
        <span>To perform any action you need to have enough funds on your public balance.</span> 
        <span>Click on your public address and use it on the <a href='https://gitter.im/kovan-testnet/faucet#' target={'_blank'}>Kovan Faset</a> page to get free funds.</span>
      </div>

      <div className={css('Footer')}>
        <img src={logo} alt="ZeroPool" style={{ margin: 'auto', height: '60px' }} />
      </div>

      <Backdrop sx={{ color: '#fff', zIndex: 1000 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
