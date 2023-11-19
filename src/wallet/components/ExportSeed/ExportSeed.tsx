import React, { useState } from 'react'
import { cn } from '@bem-react/classname'
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'

import './ExportSeed.scss'

import { Visibility, VisibilityOff } from '@mui/icons-material'

export const componentId = 'ExportSeed'

const bem = cn(componentId)

export type EditWalletProps = {
  onExport: (password: string) => void
  onCancel: () => void
}

export const ExportSeed: React.FC<EditWalletProps> = ({ onExport, onCancel }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const minLength = 4

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && password.length >= minLength) {
      onExport(password)
      e.preventDefault()
    } else if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <form className={bem()} data-testid={bem()}>
      <p className={bem('Name')}>Export Seed</p>

      <FormControl className={bem('FormControl')}>
        <InputLabel className={bem('FormControlLabel')} htmlFor="password">
          Password
        </InputLabel>

        <Input
          id="password"
          className={bem('Password')}
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
          onKeyDown={handleInput}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                className={bem('FormControlButton')}
                aria-label="toggle visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button
        disabled={password.length < minLength}
        className={bem('Export')}
        data-testid={bem('Export')}
        onClick={() => onExport(password)}
        color="primary"
        variant="contained"
      >
        Export
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
    </form>
  )
}
