// tslint:disable: prettier max-line-length
import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Button, Input } from '@mui/material'
import { Refresh, Menu } from '@mui/icons-material'
import { testIdBuilder } from 'shared/helpers/test'
import { cn } from '@bem-react/classname'

import './DemoPage.scss'
import logo from 'assets/images/logo1.svg'

import { selectMinting, selectPrivateAmount, selectTokenAmount } from 'wallet/state/demo.selectors'
import { demoActions } from 'wallet/state/demo.reducer'
import { DemoHeader } from 'wallet/components/DemoHeader/DemoHeader'
// tslint:enable: prettier max-line-length

export const componentId = 'DemoPage'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export const DemoPage: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const tokenAmount = useSelector(selectTokenAmount)
  const privateAmount = useSelector(selectPrivateAmount)
  const minting = useSelector(selectMinting)

  const [mintAmount, setMintAmount] = useState('0')

  useEffect(() => {
    if (tokenAmount === undefined) {
      dispatch(demoActions.initApi(null))
    }
  }, [dispatch])

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
            <DemoHeader tokenAmount={tokenAmount} privateAmount={privateAmount} />
          </div>
        </Toolbar>
      </AppBar>

      <div className={css('Wrapper')}>
        <div>
          <Input
            id="mint-amount"
            className={css('Password')}
            sx={{ color: 'black' }}
            color="primary"
            classes={{ input: css('PasswordInput') }}
            inputProps={{ 'data-testid': test('Password'), maxLength: 20 }}
            onChange={(event) => setMintAmount(event.target.value)}
          />

          <Button
            color="primary"
            variant="contained"
            className={css('Button')}
            data-testid={test('Import')}
            disabled={minting === true || mintAmount === '0' || isNaN(+mintAmount)}
            onClick={() => dispatch(demoActions.mint(mintAmount))}
          >
            Mint
          </Button>
        </div>
      </div>

      <div className={css('Footer')}>
        <img src={logo} alt="ZeroPool" style={{ margin: 'auto' }} />
      </div>
    </div>
  )
}
