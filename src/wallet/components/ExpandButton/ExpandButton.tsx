import React, { HTMLAttributes } from 'react';
import { cn } from '@bem-react/classname';
import { IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import './ExpandButton.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';

export const componentId = 'ExpandButton';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface ExpendButtonProps extends HTMLAttributes<HTMLElement>{
  expanded: boolean;
  click: () => void; 
 }

export const ExpandButton: React.FC<ExpendButtonProps> = ({expanded, click, ...props}) => {

  return (
    <div className={css({Expended: expanded}, [props.className])} data-testid={test()} onClick={click}>
      <IconButton
        color="inherit"
        aria-label="menu"
        edge="start"
        disableRipple={true}
        disableFocusRipple={true}
        disableTouchRipple={true}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  )
};