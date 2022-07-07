import React from 'react'
import { cn } from '@bem-react/classname'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import './AboutPage.scss'

export const componentId = 'AboutPage'
const bem = cn(componentId)

export interface AboutPageProps {
  showBackButton?: boolean
}

export const AboutPage: React.FC<AboutPageProps> = ({ showBackButton = true }) => {
  const navigate = useNavigate()

  return (
    <div className={bem()} data-testid="AboutPage">
      <h2 className={bem('Header')}> ABOUT ZEROPOOL </h2>

      <p className={bem('Text')}>
        ZeroPool is fully private multi-blokchain solution. Low transaction fees, atomic swaps and
        common anonymity set. Balances and transaction graph are hidden and compatibility with
        network identity hiding technologies, like Tor. You can deposit, transfer and withdraw
        tokens in our product.
      </p>

      <p className={bem('Text')}>
        The projec was found at ethDenver by a group of reserchers and still developed as product
        with strong scientific base.
      </p>

      {showBackButton ? (
        <p className={bem('Button')}>
          <Button
            color="primary"
            data-testid={bem('BackButton')}
            onClick={() => { navigate('/register') }}
            variant="outlined"
          >
            Back
          </Button>
        </p>
      ) : null}
    </div>
  )
}
