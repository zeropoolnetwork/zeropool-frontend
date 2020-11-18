import { cn } from '@bem-react/classname';
import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { Close, Visibility, VisibilityOff } from '@material-ui/icons';
import { Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';

import './ImportAccount.scss';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';

import { SeedPanel } from 'register/components/SeedPanel/SeedPanel';

export const componentId = 'ImportAccount';

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
  seed: string;
  password: string;
  confirm: string;
}

export interface ImportAccountProps {
  onBack: () => void;
  onImport: (data: { seed: string[], password: string }) => void;
}

export const ImportAccount: React.FC<ImportAccountProps> = ({ onBack, onImport }) => {
  const { handleSubmit, register, reset, control, errors } = useForm<FormData>({ criteriaMode: "all" });

  const [seed, setSeed] = useState([] as string[]);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <div className={css()} data-testid={test()}>
      {process.env.NODE_ENV !== 'production' && <DevTool control={control} />}
      <section>
        <SeedPanel seed={seed} />
        <form onSubmit={handleSubmit((data: FormData) => onImport({ ...data, seed }))} className={css('Form')}>
          <FormControl className={css('FormControl')} error={!!errors['seed']}>
            <InputLabel htmlFor="seed">Secret phrase</InputLabel>

            <Input id="seed"
              className={css('Seed')}
              inputProps={{ 'data-testid': test('Seed') }}
              inputRef={register()}
              name="seed"
              onChange={() => setSeed(control.getValues()['seed'].split(/[ ,.]+/).filter((str) => !!str))}
              type={'text'}
              endAdornment={
                <InputAdornment position="end">
                  {seed.length ?
                    <IconButton
                      aria-label="empty seed"
                      onClick={() => { reset({ seed: undefined, password: control.getValues()['password'], confirm: control.getValues()['confirm'] }); setSeed([]); }}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      <Close />
                    </IconButton> : null
                  }
                </InputAdornment>
              }
            />

            {errors['password'] ?
              <FormHelperText data-testid={test('SeedError')}>{errors['seed']?.message}</FormHelperText>
              : null
            }
          </FormControl>

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
                      onClick={() => { reset({ seed: control.getValues()['seed'], password: undefined, confirm: control.getValues()['confirm'] }); setPassword(''); }}
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
                      onClick={() => { reset({ seed: control.getValues()['seed'], password: control.getValues()['password'], confirm: undefined }); setPasswordConfirm(''); }}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      <Close />
                    </IconButton> : <span></span>
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

          <Button
            color="primary"
            className={css('Button')}
            data-testid={test('Import')}
            disableElevation
            variant="contained"
            type="submit"
          >
            Import
          </Button>

          <Button
            color="primary"
            className={css('Button')}
            data-testid={test('Back')}
            disableElevation
            onClick={onBack}
            variant="outlined"
          >
            Back
          </Button>
        </form>
      </section>
    </div >
  )
};