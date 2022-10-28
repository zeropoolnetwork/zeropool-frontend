// tslint:disable: max-line-length prettier
import { cn } from '@bem-react/classname'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import React, { useState } from 'react'
import { Close, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'

import { confirmValidator, passwordValidator } from 'shared/utils/form-validators'

import './StepFour.scss'

export const componentId = 'StepFour'
// tslint:enable: max-line-length prettier

const bem = cn(componentId)
/*
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
*/
interface FormData {
  password: string
  confirm: string
}
export interface StepFourProps {
  onRegister: (data: { password: string }) => void
  onBack: () => void
}

export const StepFour: React.FC<StepFourProps> = ({ onRegister, onBack }) => {
  // tslint:disable: max-line-length prettier
  const [showPassword, setShowPassword] = useState(false)

  const { handleSubmit, register, reset, control, formState: { errors }, getValues, setValue, watch } = useForm<FormData>()
  const { onChange: onChangePassword, onBlur: onBlurPassword, name: namePassword, ref: refPassword } = register('password', passwordValidator)
  const { onChange: onChangeConfirm, onBlur: onBlurConfirm, name: nameConfirm, ref: refConfirm } = register('confirm', confirmValidator(getValues))
  const watchPassword = watch('password', '')
  const watchConfirm = watch('confirm', '')
  // tslint:enable: max-line-length prettier

  return (
    <div className={bem()} data-testid={bem()}>
      {process.env.NODE_ENV !== 'production' && <DevTool control={control} />}

      <form onSubmit={handleSubmit(onRegister)} className={bem('Form')}>
        <FormControl className={bem('FormControl')} error={!!errors.password}>
          <InputLabel className={bem('FormControlLabel')} htmlFor="password">
            Password
          </InputLabel>

          <Input
            id="password"
            color="secondary"
            className={bem('Password')}
            inputProps={{ 'data-testid': bem('Password') }}
            ref={refPassword}
            name={namePassword}
            onChange={onChangePassword}
            onBlur={onBlurPassword}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                {watchPassword ? (
                  <IconButton
                    tabIndex={-1}
                    className={bem('FormControlButton')}
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
                  tabIndex={-1}
                  className={bem('FormControlButton')}
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
            <FormHelperText data-testid={bem('PasswordError')}>
              {errors.password.message}
            </FormHelperText>
          ) : null}
        </FormControl>

        <FormControl className={bem('FormControl')} error={!!errors.confirm}>
          <InputLabel className={bem('FormControlLabel')} htmlFor="confirm">
            Confirm password
          </InputLabel>

          <Input
            id="confirm"
            color="secondary"
            className={bem('Password')}
            inputProps={{ 'data-testid': bem('Confirm') }}
            ref={refConfirm}
            name={nameConfirm}
            onChange={onChangeConfirm}
            onBlur={onBlurConfirm}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                {watchConfirm ? (
                  <IconButton
                    tabIndex={-1}
                    className={bem('FormControlButton')}
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
                  tabIndex={-1}
                  className={bem('FormControlButton')}
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
            <FormHelperText data-testid={bem('PasswordConfirmError')}>
              Passwords do not match
            </FormHelperText>
          ) : null}
        </FormControl>

        <p className={bem('Description')}>
          Finally, please choose a password to access your secret phrase later
        </p>

        <Button
          color="primary"
          variant="contained"
          className={bem('Button')}
          data-testid={bem('Submit')}
          type="submit"
        >
          Register
        </Button>

        {
          (process.env.NODE_ENV === 'development') ? (
            <Button
              color="primary"
              variant="contained"
              className={bem('Button')}
              onClick={() => {
                reset({ password: 'test1234', confirm: 'test1234' })
                handleSubmit(onRegister)
              }}
              type="submit"
            >
              Testing: use 'test1234'
            </Button>
          ) : null
        }

        <Button
          color="primary"
          className={bem('Button')}
          data-testid={bem('Back')}
          onClick={onBack}
          variant="outlined"
        >
          Back
        </Button>
      </form>
    </div>
  )
}
