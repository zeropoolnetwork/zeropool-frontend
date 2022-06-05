// tslint:disable: prettier
import React, { useEffect } from 'react'
import { cn } from '@bem-react/classname'

import logo from 'assets/images/logo1.svg'

import './CreateAccountPage.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'

import { StepOne } from 'register/components/StepOne/StepOne'
import { StepTwo } from 'register/components/StepTwo/StepTwo'
import { Welcome } from 'register/components/Welcome/Welcome'
import { StepFour } from 'register/components/StepFour/StepFour'
import { StepThree } from 'register/components/StepThree/StepThree'
import { StepHeader } from 'register/components/StepHeader/StepHeader'
import { ImportAccount } from 'register/components/ImportAccount/ImportAccount'
import { RegisterStage } from 'register/state/models/register-stage'
import { registerSlice } from 'register/state/register.reducer'
import { selectSeed, selectStage, selectShowSteps } from 'register/state/register.selectors'
import { selectSeed as selectSeedInWallet } from 'wallet/state/wallet.selectors'
import { useAppSelector, useAppDispatch } from 'state'
import { useNavigate } from 'react-router-dom'
// tslint:enable: prettier

export const componentId = 'CreateAccountPage'

const css = cn(componentId)
const test = testIdBuilder(componentId)
const rsa = registerSlice.actions

type CreateAccountProps = {}

export const CreateAccountPage: React.FC<CreateAccountProps> = () => {
  const navigate = useNavigate()
  const seedInWallet = useAppSelector(selectSeedInWallet)
  const seed = useAppSelector(selectSeed)
  const stage = useAppSelector(selectStage)
  const showSteps = useAppSelector(selectShowSteps)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (seedInWallet) {
      navigate('/wallet')
      navigate(0)
    }
  })

  const components = () => {
    switch (stage) {
      case RegisterStage.STEP1:
        return <StepOne onGenerate={() => dispatch(rsa.generateSeed())} />
      case RegisterStage.STEP2:
        return <StepTwo seed={seed} onSubmit={() => dispatch(rsa.submitSeed())} />
      case RegisterStage.STEP3:
        return <StepThree seed={seed} onConfirm={() => dispatch(rsa.confirmSeed())} />
      case RegisterStage.STEP4:
        return (
          <StepFour
            onRegister={({ password }) => {
              dispatch(rsa.register(password))
              navigate('/wallet')
              navigate(0)
            }}
          />
        )
      case RegisterStage.IMPORT:
        return (
          <ImportAccount
            onBack={() => {
              dispatch(rsa.stepBack())
            }}
            onImport={(data) => {
              dispatch(rsa.import(data))
              navigate('/wallet')
              navigate(0)
            }}
          />
        )
      default:
        return (
          <Welcome
            // TODO: remove next line after API is connected
            onMockedLogin={() => navigate('/wallet')}
            onCreate={() => dispatch(rsa.startRegister())}
            onImport={() => dispatch(rsa.startImport())}
            onAbout={() => {
              navigate('/about')
              navigate(0)
            }}
          />
        )
    }
  }

  return (
    <div className={css()} data-testid={test()}>
      {stage && showSteps ? (
        <StepHeader step={stage} total={4} onBack={() => dispatch(rsa.stepBack())} />
      ) : null}

      {components()}

      {stage && showSteps ? (
        <div className={css('Footer')}>
          <img src={logo} alt="ZeroPool" style={{ margin: 'auto' }} />
        </div>
      ) : null}
    </div>
  )
}
