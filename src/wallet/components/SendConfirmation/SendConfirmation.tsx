import React from 'react';
import { cn } from '@bem-react/classname';

import './SendConfirmation.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

export const componentId = 'SendConfirmation';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface SendConfirmationProps { 
  onSendClick: () => void;
}

export const SendConfirmation: React.FC<SendConfirmationProps> = (props) => {

  return (
    <div className={css()} data-testid={test()}>
      <h1> SendConfirmation </h1>

      <div className="NextButton" >
        <button onClick={() => props.onSendClick}>
          Next
        </button>
      </div>
    </div>
  )
};