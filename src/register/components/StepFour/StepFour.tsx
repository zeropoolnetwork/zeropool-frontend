import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import './StepFour.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { Close, Visibility, VisibilityOff } from '@material-ui/icons';
export const componentId = 'StepFour';

const css = cn(componentId);
const test = testIdBuilder(componentId);

const PasswordInputParams = {
  required: "Required",
  pattern: {
    value: /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/,
    message: "Use letters and numbers"
  },
  minLength: {
    value: 8,
    message: "Use at least 8 characters"
  }
}

interface FormData {
  password: string;
  confirm: string;
}

export interface StepFourProps {
  onRegister: (data: { password: string }) => void;
}

export const StepFour: React.FC<StepFourProps> = ({ onRegister }) => {
  const { handleSubmit, register, reset, control, errors } = useForm<FormData>({ criteriaMode: "all" });

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <div className={css()} data-testid={test()}>
      {process.env.NODE_ENV !== 'production' && <DevTool control={control} />}
      
      <form onSubmit={handleSubmit(onRegister)} className={css('Form')}>
        <FormControl className={css('FormControl')} error={!!errors['password']}>
          <InputLabel className={css('FormControlLabel')} htmlFor="password">Password</InputLabel>

          <Input 
            id="password"
            color="secondary"
            className={css('Password')}
            inputProps={{ 'data-testid': test('Password') }}
            inputRef={register(PasswordInputParams)}
            name="password"
            onChange={() => setPassword(control.getValues()['password'])}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                {password ?
                  <IconButton
                    className={css('FormControlButton')}
                    aria-label="empty password"
                    onClick={() => { reset({ password: undefined, confirm: control.getValues()['confirm'] }); setPassword(''); }}
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    <Close />
                  </IconButton> : null
                }

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

          {errors['password'] ?
            <FormHelperText data-testid={test('PasswordError')}>{errors['password'].message}</FormHelperText>
            : null
          }
        </FormControl>

        <FormControl className={css('FormControl')} error={!!errors['confirm']}>
          <InputLabel className={css('FormControlLabel')} htmlFor="confirm">Confirm password</InputLabel>

          <Input 
            id="confirm"
            color="secondary"
            className={css('Password')}
            inputProps={{ 'data-testid': test('Confirm') }}
            inputRef={register({
              validate: value => value === control.getValues()['password']
            })}
            name="confirm"
            onChange={() => setPasswordConfirm(control.getValues()['confirm'])}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                {passwordConfirm ?
                  <IconButton
                    className={css('FormControlButton')}
                    aria-label="empty confirmation"
                    onClick={() => { reset({ password: control.getValues()['password'], confirm: undefined }); setPasswordConfirm(''); }}
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    <Close />
                  </IconButton> : null
                }

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

          {errors['confirm'] ?
            <FormHelperText data-testid={test('PasswordConfirmError')}>
              Passwords do not match
            </FormHelperText> : null
          }
        </FormControl>

        <p className={css('Description')}>
          Finally, please choose a password to be used
          to export your secret phrase in the future.
        </p>

        <Button
          color="primary"
          className={css('Button')}
          data-testid={test('Submit')}
          disableElevation
          variant="contained"
          type="submit"
        >
          Register
        </Button>

        {/* TODO: remove after testing */}
        <Button
          color="primary"
          className={css('Button')}
          disableElevation
          onClick={() => { reset({password: 'test1234', confirm: 'test1234'}); handleSubmit(onRegister) }}
          variant="contained"
          type="submit"
        >
          Testing: use 'test1234'
        </Button>
      </form>
    </div>
  )
};
