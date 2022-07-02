import { cn } from '@bem-react/classname'
import { Button } from '@mui/material'
import React, { useState } from 'react'

import './ConfirmReset.scss'

export const componentId = 'ConfirmReset'

const bem = cn(componentId)

export type EditWalletProps = {
  onReset: () => void
  onCancel: () => void
}

export const ConfirmReset: React.FC<EditWalletProps> = ({
  onReset,
  onCancel,
}) => {
  return (
    <div className={bem()} data-testid={bem()}>
      <p className={bem('Name')}>Confirm Reset</p>

      <div className={bem('Text')} data-testid={bem('Text')}>
        You are about to reset all your data.
        If you did not save your seed, you will lose all your funds.
      </div>

      <Button
        className={bem('Reset')}
        data-testid={bem('Reset')}
        onClick={onReset}
        color="primary"
        variant="contained"
      >
        Reset All Data
      </Button>

      <Button
        className={bem('Cancel')}
        data-testid={bem('Cancel')}
        onClick={onCancel}
        color="primary"
        variant="contained"
      >
        Cancel
      </Button>
    </div>
  )
}
