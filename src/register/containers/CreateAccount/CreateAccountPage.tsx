// tslint:disable: prettier
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { useAppSelector, useAppDispatch } from 'state'
import { selectReadiness } from 'wallet/state/demo.selectors'
// tslint:enable: prettier

export const componentId = 'CreateAccountPage'

const bem = cn(componentId)
const rsa = registerSlice.actions

type CreateAccountProps = {}

export const CreateAccountPage: React.FC<CreateAccountProps> = () => {
  const navigate = useNavigate()
  const seedInWallet = useAppSelector(selectReadiness)
  const seed = useAppSelector(selectSeed)
  const stage = useAppSelector(selectStage)
  const showSteps = useAppSelector(selectShowSteps)
  const dispatch = useAppDispatch()
  const stepBack = () => dispatch(rsa.stepBack())

  useEffect(() => {
    if (seedInWallet) {
      navigate('/wallet')
    }
  })

  const components = () => {
    switch (stage) {
      case RegisterStage.STEP1:
        return <StepOne onGenerate={() => dispatch(rsa.generateSeed())} onBack={stepBack}/>
      case RegisterStage.STEP2:
        return <StepTwo seed={seed} onSubmit={() => dispatch(rsa.submitSeed())} onBack={stepBack}/>
      case RegisterStage.STEP3:
        return <StepThree seed={seed} onConfirm={() => dispatch(rsa.confirmSeed())} onBack={stepBack}/>
      case RegisterStage.STEP4:
        return (
          <StepFour
            onBack={stepBack}
            onRegister={({ password }) => {
              dispatch(rsa.register(password))
              navigate('/wallet')
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
              // navigate(0)
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
              // navigate(0)
            }}
          />
        )
    }
  }

  return (
    <div className={bem()} data-testid={bem()}>
      {stage && showSteps ? (
        <StepHeader step={stage} total={4} onBack={stepBack} />
      ) : null}

      {components()}

      {stage && showSteps ? (
        <div className={bem('Footer')}>
          <img src={logo} alt="ZeroPool" style={{ margin: 'auto', height: '50px' }} />
        </div>
      ) : null}
    </div>
  )
}
