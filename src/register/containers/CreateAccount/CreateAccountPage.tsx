// tslint:disable: prettier
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@bem-react/classname'

import logo from 'assets/images/logo1.svg'

import './CreateAccountPage.scss'

import { StepOne } from 'register/components/StepOne/StepOne'
import { StepTwo } from 'register/components/StepTwo/StepTwo'
import { Welcome } from 'register/components/Welcome/Welcome'
import { StepFour } from 'register/components/StepFour/StepFour'
import { StepThree } from 'register/components/StepThree/StepThree'
import { StepHeader } from 'register/components/StepHeader/StepHeader'
import { ImportAccount } from 'register/components/ImportAccount/ImportAccount'
import { RegisterStage } from 'register/state/models/register-stage'
import { registerActions } from 'register/state/register.reducer'
import { selectSeed, selectStage, selectShowSteps } from 'register/state/register.selectors'

import { selectReadiness } from 'wallet/state/demo.selectors'
// tslint:enable: prettier

export const componentId = 'CreateAccountPage'
const bem = cn(componentId)

export const CreateAccountPage: React.FC<{}> = () => {
  const navigate = useNavigate()
  const seedInWallet = useSelector(selectReadiness)
  const seed = useSelector(selectSeed)
  const stage = useSelector(selectStage)
  const showSteps = useSelector(selectShowSteps)
  const dispatch = useDispatch()
  const stepBack = () => dispatch(registerActions.stepBack())

  useEffect(() => {
    if (seedInWallet) {
      navigate('/wallet')
    }
  })

  const components = () => {
    switch (stage) {
      case RegisterStage.STEP1:
        return <StepOne onGenerate={() => dispatch(registerActions.generateSeed())} onBack={stepBack} />
      case RegisterStage.STEP2:
        return <StepTwo seed={seed} onSubmit={() => dispatch(registerActions.submitSeed())} onBack={stepBack} />
      case RegisterStage.STEP3:
        return <StepThree seed={seed} onConfirm={() => dispatch(registerActions.confirmSeed())} onBack={stepBack} />
      case RegisterStage.STEP4:
        return (
          <StepFour
            onBack={stepBack}
            onRegister={({ password }) => {
              dispatch(registerActions.register(password))
              navigate('/wallet')
            }}
          />
        )
      case RegisterStage.IMPORT:
        return (
          <ImportAccount
            onBack={() => {
              dispatch(registerActions.stepBack())
            }}
            onImport={(data) => {
              dispatch(registerActions.import(data))
              navigate('/wallet')
            }}
          />
        )
      default:
        return (
          <Welcome
            onCreate={() => dispatch(registerActions.startRegister())}
            onImport={() => dispatch(registerActions.startImport())}
            onAbout={() => {
              navigate('/about')
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
          <img className={bem('Logo')} src={logo} alt="ZeroPool" />
        </div>
      ) : null}
    </div>
  )
}
