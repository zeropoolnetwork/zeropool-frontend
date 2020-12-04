import React from 'react';
import { cn } from '@bem-react/classname';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';

import './CreateAccountPage.scss';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';

import { StepOne } from 'register/components/StepOne/StepOne';
import { StepTwo } from 'register/components/StepTwo/StepTwo';
import { Welcome } from 'register/components/Welcome/Welcome';
import { StepFour } from 'register/components/StepFour/StepFour';
import { StepThree } from 'register/components/StepThree/StepThree';
import { StepHeader } from 'register/components/StepHeader/StepHeader';
import { ImportAccount } from 'register/components/ImportAccount/ImportAccount';
import { RegisterStage } from 'register/state/models/register-stage';
import { registerActions as actions } from 'register/state/register.actions';
import { getRegisterSeed, getRegisterStage, getShowSteps } from 'register/state/register.selectors';

export const componentId = 'CreateAccountPage';

const css = cn(componentId);
const test = testIdBuilder(componentId);

interface CreateAccountProps { }

export const CreateAccountPage: React.FC<CreateAccountProps> = () => {
  const stage = useSelector(getRegisterStage);
  const seed = useSelector(getRegisterSeed);
  const showSteps = useSelector(getShowSteps);
  const dispatch = useDispatch();

  const components = () => {
    switch (stage) {
      case RegisterStage.STEP1:
        return <StepOne onGenerate={() => dispatch(actions.generateSeed())} />
      case RegisterStage.STEP2:
        return <StepTwo seed={seed} onSubmit={() => dispatch(actions.submitSeed())} />
      case RegisterStage.STEP3:
        return <StepThree seed={seed} onConfirm={() => dispatch(actions.confirmSeed())} />
      case RegisterStage.STEP4:
        return <StepFour onRegister={data => dispatch(actions.finishRegister(data.password))} />
      case RegisterStage.IMPORT:
        return <ImportAccount
          onImport={data => dispatch(actions.finishImportAccount(data))}
          onBack={() => dispatch(actions.stepBack())} />
      default:
        return <Welcome
          onCreate={() => dispatch(actions.startRegisterAccount())}
          onImport={() => dispatch(actions.startImportAccount())}
          onAbout={() => dispatch(push('/about'))}
        />
    }
  }

  return (
    <div className={css()} data-testid={test()}>
      {(stage && showSteps) ? <StepHeader step={stage} total={4} onBack={() => dispatch(actions.stepBack())} /> : null}
      {components()}
    </div>
  )
};