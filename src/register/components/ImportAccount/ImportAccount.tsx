// tslint:disable: max-line-length prettier
import { cn } from '@bem-react/classname'
import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Close, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'

import { confirmValidator, passwordValidator, seedValidator } from 'shared/util/form-validators'
import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { strToArray } from 'shared/util/str-to-array'
import { SeedPanel } from 'register/components/SeedPanel/SeedPanel'

import './ImportAccount.scss'
// tslint:enable: max-line-length prettier

export const componentId = 'ImportAccount'
const css = cn(componentId)
const test = testIdBuilder(componentId)

// #region INTERFACES
interface FormData {
  seed: string
  password: string
  confirm: string
}

export interface ImportAccountProps {
  onBack: () => void
  onImport: (data: { seed: string[]; password: string }) => void
}
// #endregion

export const ImportAccount: React.FC<ImportAccountProps> = ({ onBack, onImport }) => {
  // tslint:disable: max-line-length prettier
  const [showPassword, setShowPassword] = useState(false)

  const { handleSubmit, register, control, formState: { errors }, getValues, setValue, watch } = useForm<FormData>()
  const { onChange: onChangeSeed, onBlur: onBlurSeed, name: nameSeed, ref: refSeed } = register('seed', seedValidator)
  const { onChange: onChangePassword, onBlur: onBlurPassword, name: namePassword, ref: refPassword } = register('password', passwordValidator)
  const { onChange: onChangeConfirm, onBlur: onBlurConfirm, name: nameConfirm, ref: refConfirm } = register('confirm', confirmValidator(getValues))
  const watchSeed = watch('seed', '')
  const watchPassword = watch('password', '')
  const watchConfirm = watch('confirm', '')
  // tslint:enable: max-line-length prettier

  return (
    <div className={css()} data-testid={test()}>
      {process.env.NODE_ENV !== 'production' && <DevTool control={control} />}
      <section>
        <SeedPanel classes={[css('SeedPanel')]} seed={strToArray(watchSeed)} />

        <form
          onSubmit={handleSubmit((data: FormData) => onImport({ password: data.password, seed: strToArray(watchSeed) }))}
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
              ref={refSeed}
              name={nameSeed}
              onChange={onChangeSeed}
              onBlur={onBlurSeed}
              type={'text'}
              endAdornment={
                <InputAdornment position="end">
                  {watchSeed.length ? (
                    <IconButton
                      className={css('FormControlButton')}
                      aria-label="empty seed"
                      onClick={() => {
                        setValue('seed', '')
                        errors.seed = undefined
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
            color="primary"
            variant="contained"
            className={css('Button')}
            data-testid={test('Import')}
            type="submit"
          >
            Import
          </Button>

          <Button
            color="primary"
            variant="outlined"
            className={css('Button')}
            data-testid={test('Back')}
            onClick={onBack}
          >
            Back
          </Button>
        </form>
      </section>
    </div>
  )
}
