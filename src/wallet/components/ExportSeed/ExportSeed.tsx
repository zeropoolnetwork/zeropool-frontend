import React, { useState } from 'react'
import { cn } from '@bem-react/classname'
import { Button, TextField } from '@mui/material'

import './ExportSeed.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'

export const componentId = 'ExportSeed'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type EditWalletProps = {
  onExport: (name: string) => void
  onCancel: () => void
}

export const ExportSeed: React.FC<EditWalletProps> = ({
  onExport,
  onCancel,
}) => {
  const [password, setPassword] = useState('')
  const minLength = 4

  return (
    <div className={css()} data-testid={test()}>
      <p className={css('Name')}>Export Seed</p>

      <TextField
        className={css('Password')}
        label={`Enter password`}
        value={password}
        type="password"
        onChange={(event) => {
          setPassword(event.target.value)
        }}
      />

      <Button
        disabled={password.length < minLength}
        className={css('Export')}
        data-testid={test('Export')}
        onClick={() => onExport(password)}
        color="primary"
        variant="contained"
      >
        Delete
      </Button>

      <Button
        className={css('Cancel')}
        data-testid={test('Cancel')}
        onClick={onCancel}
        color="primary"
        variant="contained"
      >
        Cancel
      </Button>
    </div>
  )
}
