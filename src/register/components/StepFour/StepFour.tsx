// tslint:disable: max-line-length prettier
import { cn } from '@bem-react/classname'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import React, { useState } from 'react'
import { Close, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'

import { confirmValidator, passwordValidator } from 'shared/utils/form-validators'
import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'

import './StepFour.scss'

export const componentId = 'StepFour'
// tslint:enable: max-line-length prettier

const css = cn(componentId)
const test = testIdBuilder(componentId)

const PasswordValodator = {
  required: 'Required',
  pattern: {
    value: /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/,
    message: 'Use letters and numbers',
  },
  minLength: {
    value: 8,
    message: 'Use at least 8 characters',
  },
}

const ConfirmValodator = (getValues: () => any) => ({
  required: 'Required',
  validate: (value: string) => value === getValues().password,
})
interface FormData {
  password: string
  confirm: string
}

export interface StepFourProps {
  onRegister: (data: { password: string }) => void
}

export const StepFour: React.FC<StepFourProps> = ({ onRegister }) => {
  // tslint:disable: max-line-length prettier
  const [showPassword, setShowPassword] = useState(false)

  const { handleSubmit, register, reset, control, formState: { errors }, getValues, setValue, watch } = useForm<FormData>()
  const { onChange: onChangePassword, onBlur: onBlurPassword, name: namePassword, ref: refPassword } = register('password', passwordValidator)
  const { onChange: onChangeConfirm, onBlur: onBlurConfirm, name: nameConfirm, ref: refConfirm } = register('confirm', confirmValidator(getValues))
  const watchPassword = watch('password', '')
  const watchConfirm = watch('confirm', '')
  // tslint:enable: max-line-length prettier

  return (
    <div className={css()} data-testid={test()}>
      {process.env.NODE_ENV !== 'production' && <DevTool control={control} />}

      <form onSubmit={handleSubmit(onRegister)} className={css('Form')}>
        <FormControl className={css('FormControl')} error={!!errors.password}>
          <InputLabel className={css('FormControlLabel')} htmlFor="password">
            Password
          </InputLabel>

          <Input
            id="password"
            color="secondary"
            className={css('Password')}
            inputProps={{ 'data-testid': test('Password') }}
            ref={refPassword}
            name={namePassword}
            onChange={onChangePassword}
            onBlur={onBlurPassword}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                {watchPassword ? (
                  <IconButton
                    className={css('FormControlButton')}
                    aria-label="empty password"
                    onClick={() => {
                      setValue('password', '')
                      setValue('confirm', '')
                      errors.password = undefined
                      errors.confirm = undefined
                    }}
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    <Close />
                  </IconButton>
                ) : null}

                <IconButton
                  className={css('FormControlButton')}
                  aria-label="toggle visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />

          {errors.password ? (
            <FormHelperText data-testid={test('PasswordError')}>
              {errors.password.message}
            </FormHelperText>
          ) : null}
        </FormControl>

        <FormControl className={css('FormControl')} error={!!errors.confirm}>
          <InputLabel className={css('FormControlLabel')} htmlFor="confirm">
            Confirm password
          </InputLabel>

          <Input
            id="confirm"
            color="secondary"
            className={css('Password')}
            inputProps={{ 'data-testid': test('Confirm') }}
            ref={refConfirm}
            name={nameConfirm}
            onChange={onChangeConfirm}
            onBlur={onBlurConfirm}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                {watchConfirm ? (
                  <IconButton
                    className={css('FormControlButton')}
                    aria-label="empty confirmation"
                    onClick={() => {
                      errors.confirm = undefined
                      setValue('confirm', '')
                    }}
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    <Close />
                  </IconButton>
                ) : null}

                <IconButton
                  className={css('FormControlButton')}
                  aria-label="toggle visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />

          {errors.confirm ? (
            <FormHelperText data-testid={test('PasswordConfirmError')}>
              Passwords do not match
            </FormHelperText>
          ) : null}
        </FormControl>

        <p className={css('Description')}>
          Finally, please choose a password to be used to export your secret phrase in the future.
        </p>

        <Button
          color="primary"
          variant="contained"
          className={css('Button')}
          data-testid={test('Submit')}
          type="submit"
        >
          Register
        </Button>

        {/* TODO: remove after testing */}
        <Button
          color="primary"
          variant="contained"
          className={css('Button')}
          onClick={() => {
            reset({ password: 'test1234', confirm: 'test1234' })
            handleSubmit(onRegister)
          }}
          type="submit"
        >
          Testing: use 'test1234'
        </Button>
      </form>
    </div>
  )
}
