import React from 'react'
import { cn } from '@bem-react/classname'
import { Button } from '@mui/material'

import './StepOne.scss'

import { SeedPanel } from 'register/components/SeedPanel/SeedPanel'
export const componentId = 'StepOne'

const bem = cn(componentId)

export interface StepOneProps {
  onGenerate: () => void
  onBack: () => void
}

export const StepOne: React.FC<StepOneProps> = ({ onGenerate, onBack }) => {

  return (
    <div className={bem()} data-testid={bem()}>
      <section>
        <SeedPanel classes={[bem('SeedPanel')]} seed={[]} />

        <p className={bem('Description')}>
          Your secret phrase consists of 12 words. Store it carefully. If you loose it, you will
          loose access to all of your associated funds!
        </p>
      </section>

      <Button
        color="primary"
        className={bem('Button')}
        data-testid={bem('Generate')}
        onClick={onGenerate}
        variant="contained"
      >
        Generate a secret phrase
      </Button>

      <Button
        color="primary"
        className={bem('Button')}
        data-testid={bem('Back')}
        onClick={onBack}
        variant="outlined"
      >
        Back
      </Button>
    </div>
  )
}
