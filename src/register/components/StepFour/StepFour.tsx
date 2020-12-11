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
      <section>
        <form onSubmit={handleSubmit(onRegister)} className={css('Form')}>
          <FormControl className={css('FormControl')} error={!!errors['password']}>
            <InputLabel htmlFor="password">Password</InputLabel>

            <Input id="password"
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
                      aria-label="empty password"
                      onClick={() => { reset({ password: undefined, confirm: control.getValues()['confirm'] }); setPassword(''); }}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      <Close />
                    </IconButton> : null
                  }

                  <IconButton
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
            <InputLabel htmlFor="confirm">Confirm password</InputLabel>

            <Input id="confirm"
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
                      aria-label="empty confirmation"
                      onClick={() => { reset({ password: control.getValues()['password'], confirm: undefined }); setPasswordConfirm(''); }}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      <Close />
                    </IconButton> : null
                  }

                  <IconButton
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

          <p>
            Finally, please choose a password to be used
            to export your secret phrase in the future.
          </p>

          <p>
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
          </p>
        </form>
      </section>
    </div>
  )
};
