import React, { HTMLAttributes } from 'react';
import { cn } from '@bem-react/classname';

import './RoundButton.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { IconButton } from '@material-ui/core';
import { cssMod } from 'shared/util/css-mod';

export const componentId = 'RoundButton';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface  RoundButtonProps extends HTMLAttributes<HTMLElement>{
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export const RoundButton: React.FC<RoundButtonProps> = (({ label, labelPosition = 'bottom', ...props}) => (
  <div className={css({NoLabel: !label})} data-testid={test()}>
    <IconButton 
      className={css('Button', {}, [props.className])} 
      data-testid={test('Button')}
      disableRipple={true}
      disableFocusRipple={true}
      disableTouchRipple={true}
      onClick={props.onClick}
    >
        {props.children}
    </IconButton>

    <span 
      className={css('Label', {...cssMod(labelPosition)}, ['noselect'])} 
      data-testid={test('Label')}
    >
        {label}
    </span>
  </div>
));



