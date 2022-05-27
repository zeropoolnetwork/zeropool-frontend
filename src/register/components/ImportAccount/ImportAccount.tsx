import { cn } from '@bem-react/classname'
import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Close, Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'

import './ImportAccount.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'

import { SeedPanel } from 'register/components/SeedPanel/SeedPanel'
import { validateSeed } from 'register/state/helpers/seed.helper'

export const componentId = 'ImportAccount'

const css = cn(componentId)
const test = testIdBuilder(componentId)

const PasswordInputParams = {
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

const seedInputParamsFactory = (seed: string[]): any => ({
  required: 'Required',
  validate: (value: string[]) => validateSeed(seed),
})

interface FormData {
  seed: string
  password: string
  confirm: string
}

export interface ImportAccountProps {
  onBack: () => void
  onImport: (data: { seed: string[]; password: string }) => void
}

export const ImportAccount: React.FC<ImportAccountProps> = ({ onBack, onImport }) => {
  const { handleSubmit, register, reset, control,  formState: { errors }, getValues } =
    useForm<FormData>({ criteriaMode: 'all' })

  const [seed, setSeed] = useState([] as string[])
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  return (
    <div className={css()} data-testid={test()}>
      {process.env.NODE_ENV !== 'production' && <DevTool control={control} />}
      <section>
        <SeedPanel classes={[css('SeedPanel')]} seed={seed} />

        <form
          onSubmit={handleSubmit((data: FormData) => onImport({ password: data.password, seed }))}
          className={css('Form')}
        >
          <FormControl className={css('FormControl')} error={!!errors.seed}>
            <InputLabel color="secondary" className={css('FormControlLabel')} htmlFor="seed">
              Secret phrase
            </InputLabel>

            <Input
              id="seed"
              className={css('Seed')}
              color="secondary"
              inputProps={{ 'data-testid': test('Seed') }}
              inputRef={register(seedInputParamsFactory(seed)) as any}
              name="seed"
              onChange={() => setSeed(getValues().seed.split(/[ ,.]+/).filter((s) => !!s))}
              type={'text'}
              endAdornment={
                <InputAdornment position="end">
                  {seed.length ? (
                    <IconButton
                      className={css('FormControlButton')}
                      aria-label="empty seed"
                      onClick={() => {
                        reset({
                          seed: undefined,
                          password: getValues().password,
                          confirm: getValues().confirm,
                        })
                        setSeed([])
                      }}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      <Close />
                    </IconButton>
                  ) : (
                    <span />
                  )}
                </InputAdornment>
              }
            />

            {errors.seed ? (
              <FormHelperText data-testid={test('SeedError')}>
                {errors.seed.message || 'Input 12 uniq words divided with comas or spaces'}
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl className={css('FormControl')} error={!!errors.password}>
            <InputLabel className={css('FormControlLabel')} htmlFor="password">
              Password
            </InputLabel>

            <Input
              id="password"
              className={css('Password')}
              color="secondary"
              classes={{ input: css('PasswordInput') }}
              inputProps={{ 'data-testid': test('Password') }}
              inputRef={register('password', PasswordInputParams) as any}
              name="password"
              onChange={() => setPassword(getValues().password)}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  {password ? (
                    <IconButton
                      className={css('FormControlButton')}
                      aria-label="empty password"
                      onClick={() => {
                        reset({
                          seed: getValues().seed,
                          password: undefined,
                          confirm: getValues().confirm,
                        })
                        setPassword('')
                      }}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      <Close />
                    </IconButton>
                  ) : (
                    <span />
                  )}

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
              className={css('Password')}
              color="secondary"
              classes={{ input: css('PasswordInput') }}
              inputProps={{ 'data-testid': test('Confirm') }}
              inputRef={
                register('confirm', {
                  validate: (value) => value === getValues().password,
                }) as any
              }
              name="confirm"
              onChange={() => setPasswordConfirm(getValues().confirm)}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  {passwordConfirm ? (
                    <IconButton
                      className={css('FormControlButton')}
                      aria-label="empty confirmation"
                      onClick={() => {
                        reset({
                          seed: getValues().seed,
                          password: getValues().password,
                          confirm: undefined,
                        })
                        setPasswordConfirm('')
                      }}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      <Close />
                    </IconButton>
                  ) : (
                    <span />
                  )}

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

          <Button
            // color="primary"
            className={css('Button')}
            data-testid={test('Import')}
            disableElevation={true}
            // variant="contained"
            type="submit"
          >
            Import
          </Button>

          <Button
            // color="primary"
            className={css('Button')}
            data-testid={test('Back')}
            disableElevation={true}
            onClick={onBack}
            // variant="outlined"
          >
            Back
          </Button>
        </form>
      </section>
    </div>
  )
}
