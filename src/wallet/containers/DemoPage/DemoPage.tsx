// tslint:disable: prettier max-line-length
import { AppBar, Backdrop, CircularProgress, IconButton, Toolbar, Tooltip, Input } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Refresh, Menu } from '@mui/icons-material'
import { testIdBuilder } from 'shared/helpers/test'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import { cn } from '@bem-react/classname'
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import './DemoPage.scss'
import logo from 'assets/images/logo1.svg'

import { selectBackdrop, selectDeposit, selectMinting, selectPrivateBalance, selectPublicBalance, selectTokenBalance, selectWalletAddress, selectWithdraw } from 'wallet/state/demo.selectors'
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
  const deposit = useSelector(selectDeposit)
  const withdraw = useSelector(selectWithdraw)

  const [mintAmount, setMintAmount] = useState('0')
  const [depositAmount, setDepositAmount] = useState('0')
  const [withdrawAmount, setWithdrawAmount] = useState('0')

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
              publicBalance={publicBalance}
              privateBalance={privateBalance}
              tokenBalance={tokenBalance}
              walletAddress={walletAddress}
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
            classes={{ input: css('PasswordInput') }}
            inputProps={{ 'data-testid': test('Password'), maxLength: 20 }}
            onChange={(event) => setMintAmount(event.target.value)}
          />

          <LoadingButton
            loading={minting}
            loadingPosition="start"
            color="primary"
            variant="contained"
            className={css('Button')}
            data-testid={test('Mint')}
            startIcon={<KeyboardTabIcon />}
            disabled={minting || !mintAmount || mintAmount === '0' || isNaN(+mintAmount)}
            onClick={() => { dispatch(demoActions.mint(mintAmount)); setMintAmount('0') }}
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
            classes={{ input: css('PasswordInput') }}
            inputProps={{ 'data-testid': test('Password'), maxLength: 20 }}
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
            disabled={deposit || !depositAmount || depositAmount === '0' || !tokenBalance || isNaN(+depositAmount) || +depositAmount > tokenBalance}
            onClick={() => { dispatch(demoActions.deposit(depositAmount)); setDepositAmount('0') }}
          >
            Deposit
          </LoadingButton>
        </div>

        <div>
          <Input
            id="withdraw-amount"
            className={css('Withdraw')}
            sx={{ color: 'black' }}
            color="primary"
            classes={{ input: css('Withdraw') }}
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
            startIcon={<KeyboardDoubleArrowRightIcon />}
            disabled={withdraw || !withdrawAmount || withdrawAmount === '0' || !privateBalance || isNaN(+withdrawAmount) || +withdrawAmount > privateBalance}
            onClick={() => { dispatch(demoActions.withdraw(withdrawAmount)); setWithdrawAmount('0') }}
          >
            Withdraw
          </LoadingButton>
        </div>

      </div>

      <div className={css('Footer')}>
        <img src={logo} alt="ZeroPool" style={{ margin: 'auto' }} />
      </div>

      <Backdrop sx={{ color: '#fff', zIndex: 1000 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
