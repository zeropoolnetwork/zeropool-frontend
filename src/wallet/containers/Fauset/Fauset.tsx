import { Paper, Typography, Input } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingButton } from '@mui/lab'
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen'
import { useState } from 'react'
import { cn } from '@bem-react/classname'

import './Faucet.scss'
import { RootState } from 'state'
import { badAmount } from 'shared/utils/bad-amount'
import { demoActions } from 'wallet/state/demo.reducer'

export const componentId = 'Faucet'

const bem = cn(componentId)

type FaucetProps = {}
type FaucetState = {
  amount: string
  address: string
}

const InitialFaucetState: FaucetState = {
  address: '',
  amount: '',
}

export const Fauset: React.FC<FaucetProps> = () => {
  const [faucet, setFaucet] = useState<FaucetState>(InitialFaucetState)
  const dispatch = useDispatch()
  const { address, amount } = faucet
  const processing = useSelector((state: RootState) => state.demo.fauceting)

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFaucet({ ...faucet, address: event.target.value })
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFaucet({ ...faucet, amount: event.target.value })
  }

  const handleFaucet = () => {
    setFaucet({ ...faucet })
    dispatch(demoActions.faucetRequest({ address, amount }))
  }

  const handleFaucetReset = () => setFaucet(InitialFaucetState)

  return (
    <Paper className={bem()} elevation={2}>
      <div className={bem('Container')}>
        <Typography variant="h6" className={bem('Title')}>
          🚀 Near Testnet Faucet
        </Typography>
        <Input
          value={address}
          color="primary"
          sx={{ color: 'black' }}
          data-testid={bem('AddressInput')}
          classes={{ input: bem('Input') }}
          placeholder="Address"
          inputProps={{ 'data-testid': bem('Address'), maxLength: 100 }}
          onChange={handleAddressChange}
        />
        <Input
          value={amount}
          color="primary"
          sx={{ color: 'black' }}
          data-testid={bem('Input')}
          classes={{ input: bem('Input') }}
          placeholder="Amount"
          inputProps={{ 'data-testid': bem('Amount'), maxLength: 10 }}
          onChange={handleAmountChange}
        />
        <LoadingButton
          loading={processing}
          loadingPosition="start"
          color="primary"
          variant="contained"
          className={bem('Button')}
          data-testid={bem('MintButton')}
          startIcon={<SoupKitchenIcon />}
          disabled={badAmount(amount)}
          onClick={handleFaucet}
        >
          Request
        </LoadingButton>

        <span className={bem('Limit')}>Limit: 5 tokens per day</span>
      </div>
    </Paper>
  )
}

