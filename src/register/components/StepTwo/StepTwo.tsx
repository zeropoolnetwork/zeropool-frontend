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

const css = cn(componentId)
const test = testIdBuilder(componentId)


interface StepTwoProps {
  seed: string[]
  onSubmit: () => void
}

export const StepTwo: React.FC<StepTwoProps> = ({ seed, onSubmit }) => {
  const { enqueueSnackbar } = useSnackbar()

  return (
    <div className={css()} data-testid="StepTwo">
      <section>
        <SeedPanel classes={[css('SeedPanel')]} seed={seed} />

        <p className={css('Description')}>
          By submiting, you confirm that you have stored the secret phrase on paper or
          using another safe method.
        </p>
      </section>

      <Button
        color="primary"
        className={css('Button')}
        data-testid={test('SubmitButton')}
        onClick={onSubmit}
        variant="contained"
      >
        Submit
      </Button>

      <Button
        color="primary"
        variant="outlined"
        className={css('Button')}
        data-testid={test('SaveSeedButton')}
        onClick={() => copyToClipboard(strFromArray(seed), 'Seed', enqueueSnackbar)}
      >
        Export seed
      </Button>
    </div>
  )
}
