import React, { useState } from 'react'
import { cn } from '@bem-react/classname'
import { Button } from '@mui/material'

import './StepThree.scss'

import { SeedPanel } from 'register/components/SeedPanel/SeedPanel'

export const componentId = 'StepThree'

const bem = cn(componentId)

export interface StepThreeProps {
  seed: string[]
  onConfirm: () => void
  onBack: () => void
}
export const StepThree: React.FC<StepThreeProps> = ({ seed, onConfirm, onBack }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true)

  return (
    <div className={bem()} data-testid={bem()}>
      <section>
        <SeedPanel
          classes={[bem('SeedPanel')]}
          seed={seed}
          check={true}
          onCheck={(success: boolean) => setButtonDisabled(!success)}
        />

        <p className={bem('Description')}>
          Please confirm your secret phrase, we want to be sure you saved it correctly
        </p>
      </section>

      <Button
        color="primary"
        className={bem('Button', { Disabled: buttonDisabled })}
        data-testid={bem('Confirm')}
        disabled={buttonDisabled}
        onClick={onConfirm}
        variant="contained"
      >
        Confirm
      </Button>

      {
        (process.env.NODE_ENV === 'development') ? (
          <Button
            color="primary"
            className={bem('Button')}
            disableElevation={true}
            onClick={onConfirm}
            variant="contained"
          >
            Testing: force confirm
          </Button>
        ) : null
      }

      <Button
        className={bem('Button')}
        data-testid={bem('Back')}
        onClick={onBack}
        variant="outlined"
        sx={{ width: 200 }}

      >
        Back
      </Button>
    </div>
  )
}
