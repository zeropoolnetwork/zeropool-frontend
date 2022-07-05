import React from 'react'
import { cn } from '@bem-react/classname'
import { Button } from '@mui/material'
import { useSnackbar } from 'notistack'

import './StepTwo.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'

import { SeedPanel } from 'register/components/SeedPanel/SeedPanel'
import { strFromArray } from 'shared/utils/str-from-array'
import { copyToClipboard } from 'shared/utils/copy-to-clipboard'

export const componentId = 'StepTwo'

const bem = cn(componentId)
const test = testIdBuilder(componentId)


export interface StepTwoProps {
  seed: string[]
  onSubmit: () => void
  onBack: () => void
}

export const StepTwo: React.FC<StepTwoProps> = ({ seed, onSubmit, onBack }) => {
  const { enqueueSnackbar } = useSnackbar()

  return (
    <div className={bem()} data-testid="StepTwo">
      <section>
        <SeedPanel classes={[bem('SeedPanel')]} seed={seed} />

        <p className={bem('Description')}>
          By submitting you confirm to have stored the secret phrase on paper or
          used another safe method
        </p>
      </section>

      <Button
        color="primary"
        className={bem('Button')}
        data-testid={test('Submit')}
        onClick={onSubmit}
        variant="contained"
      >
        Submit
      </Button>

      <Button
        color="primary"
        variant="outlined"
        className={bem('Button')}
        data-testid={test('SaveSeed')}
        onClick={() => copyToClipboard(strFromArray(seed), 'Seed', enqueueSnackbar)}
      >
        Export seed
      </Button>

      <Button
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
