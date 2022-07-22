// tslint:disable: max-line-length prettier
import { cn } from '@bem-react/classname'
import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Close, Visibility, VisibilityOff, CopyAll } from '@mui/icons-material'
import { Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'

import { confirmValidator, passwordValidator, seedValidator } from 'shared/utils/form-validators'
import { strToArray } from 'shared/utils/str-to-array'
import { SeedPanel } from 'register/components/SeedPanel/SeedPanel'
// tslint:enable: max-line-length prettier

import './ImportAccount.scss'
import { copyFromClipboard } from 'shared/utils/copy-from-clipboard'
import { useSnackbar } from 'notistack'

export const componentId = 'ImportAccount'
const bem = cn(componentId)

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
  const { enqueueSnackbar } = useSnackbar()
  // tslint:enable: max-line-length prettier

  return (
    <div className={bem()} data-testid={bem()}>
      {process.env.NODE_ENV !== 'production' && <DevTool control={control} />}
      <section>
        {/* <SeedPanel classes={[bem('SeedPanel')]} seed={strToArray(watchSeed)} /> */}

        <form
          onSubmit={handleSubmit((data: FormData) => onImport({ password: data.password, seed: strToArray(watchSeed) }))}
          className={bem('Form')}
        >
          <FormControl className={bem('FormControl')} error={!!errors.seed}>
            <InputLabel color="secondary" className={bem('FormControlLabel')} htmlFor="seed">
              Secret phrase
            </InputLabel>

            <Input
              id="seed"
              className={bem('Seed')}
              color="secondary"
              inputProps={{ 'data-testid': bem('Seed') }}
              ref={refSeed}
              name={nameSeed}
              onChange={onChangeSeed}
              onBlur={onBlurSeed}
              type={'text'}
              endAdornment={
                <InputAdornment position="end">
                  {watchSeed.length ? (
                    <IconButton
                      className={bem('FormControlButton')}
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
                  <IconButton
                    className={bem('FormControlButton')}
                    aria-label="paste"
                    onClick={() => copyFromClipboard('Seed', enqueueSnackbar, seed => {
                      setValue('seed', seed);
                      (document.getElementById('seed') as any).focus();
                    })}
                  >
                    <CopyAll />
                  </IconButton>
                </InputAdornment>
              }
            />

            {errors.seed ? (
              <FormHelperText data-testid={bem('SeedError')}>
                {errors.seed.message || 'Input 12 uniq words divided with comas or spaces'}
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl className={bem('FormControl')} error={!!errors.password}>
            <InputLabel className={bem('FormControlLabel')} htmlFor="password">
              Password
            </InputLabel>

            <Input
              id="password"
              className={bem('Password')}
              color="secondary"
              classes={{ input: bem('PasswordInput') }}
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
                  ) : (
                    <span />
                  )}

                  <IconButton
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
              className={bem('Password')}
              color="secondary"
              classes={{ input: bem('PasswordInput') }}
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
                  ) : (
                    <span />
                  )}

                  <IconButton
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

          <Button
            color="primary"
            variant="contained"
            className={bem('Button')}
            data-testid={bem('Import')}
            type="submit"
          >
            Save
          </Button>

          <Button
            color="primary"
            variant="outlined"
            className={bem('Button')}
            data-testid={bem('Back')}
            onClick={onBack}
          >
            Back
          </Button>
        </form>
      </section>
    </div>
  )
}
