import React from 'react'
import { cn } from '@bem-react/classname'
import { ArrowBack } from '@mui/icons-material'
import { Button, MobileStepper, Tooltip } from '@mui/material'

import './StepHeader.scss'

import { Perl } from 'register/components/Perl/Perl'

export const componentId = 'StepHeader'
const bem = cn(componentId)

export type StepHeaderProps = {
  step: number
  total: number
  onBack: () => void
}

export const StepHeader: React.FC<StepHeaderProps> = ({ step, total, onBack }) => {
  return (
    <div className={bem()} data-testid={bem()}>
      <Tooltip title="Step back" placement="top-end">
        <Button
          className={bem('Button')}
          data-testid={bem('BackButton')}
          onClick={onBack}
          disableRipple={true}
        >
          <ArrowBack className={bem('Icon')} />
        </Button>
      </Tooltip>

      <div className={bem('Perls')} data-testid={bem('Perls')}>
        {[1, 2, 3, 4].map((value) => (
          <Perl
            classes={[bem('Perl', { Active: value === step })]}
            isActive={value === step}
            key={value}
            num={value}
          />
        ))}
      </div>

      <MobileStepper
        className={bem('Progress')}
        variant="progress"
        steps={total + 1}
        position="static"
        activeStep={step - 1}
        backButton={<span className="hidden">back</span>}
        nextButton={<span className="hidden">next</span>}
      />
    </div>
  )
}
