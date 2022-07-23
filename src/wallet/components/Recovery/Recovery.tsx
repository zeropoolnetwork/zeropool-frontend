import React, { useState } from 'react'
import { cn } from '@bem-react/classname'
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'

import './Recovery.scss'

import { Visibility, VisibilityOff } from '@mui/icons-material'

export const componentId = 'Recovery'

const bem = cn(componentId)

export type RecoveryProps = {
  onReset: () => void
  onRecover: (password: string) => void
}

export const Recovery: React.FC<RecoveryProps> = ({
  onReset,
  onRecover,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const minLength = 4

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && password.length >= minLength) {
      onRecover(password)
      e.preventDefault()
    } else if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <form className={bem()} data-testid={bem()}>
      <p className={bem('Name')}>Recover wallet</p>

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
                tabIndex={-1}
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
        className={bem('Button')}
        data-testid={bem('Export')}
        onClick={() => onRecover(password)}
        color="primary"
        variant="contained"
      >
        Recover
      </Button>

      <Button
        className={bem('Button', { Reset: true })}
        data-testid={bem('Reset')}
        onClick={onReset}
        color="primary"
        variant="contained"
      >
        Reset
      </Button>
    </form>
  )
}
