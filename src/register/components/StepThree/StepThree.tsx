import React, { useState } from 'react'
import { cn } from '@bem-react/classname'
import { Button } from '@mui/material'

import './StepThree.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'

import { SeedPanel } from 'register/components/SeedPanel/SeedPanel'

export const componentId = 'StepThree'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export interface StepThreeProps {
  seed: string[]
  onConfirm: () => void
}
export const StepThree: React.FC<StepThreeProps> = ({ seed, onConfirm }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true)

  return (
    <div className={css()} data-testid={test()}>
      <section>
        <SeedPanel
          classes={[css('SeedPanel')]}
          seed={seed}
          check={true}
          onCheck={(success: boolean) => setButtonDisabled(!success)}
        />

        <p className={css('Description')}>
          Please confirm your secret phrase, we want to be sure you saved it correctly
        </p>
      </section>

      <Button
        color="primary"
        className={css('Button', { Disabled: buttonDisabled })}
        data-testid={test('ConfirmButton')}
        disabled={buttonDisabled}
        onClick={onConfirm}
        variant="contained"
      >
        Confirm
      </Button>

      {/* TODO: remove after testing */}
      <Button
        color="primary"
        className={css('Button')}
        disableElevation={true}
        onClick={onConfirm}
        variant="contained"
      >
        Testing: force confirm
      </Button>
    </div>
  )
}
