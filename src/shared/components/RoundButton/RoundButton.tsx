import React, { HTMLAttributes } from 'react'
import { IconButton } from '@mui/material'
import { cn } from '@bem-react/classname'

import './RoundButton.scss'

import { cssMod } from 'shared/utils/css-mod'

export const componentId = 'RoundButton'
const bem = cn(componentId)

export interface RoundButtonProps extends HTMLAttributes<HTMLElement> {
  label?: string
  labelPosition?: 'top' | 'bottom' | 'left' | 'right'
}

export const RoundButton: React.FC<RoundButtonProps> = ({
  label,
  labelPosition = 'bottom',
  ...props
}) => (
  <div className={bem({ NoLabel: !label })} data-testid={bem()}>
    <IconButton
      className={bem('Button', {}, [props.className])}
      data-testid={bem('Button')}
      disableRipple={true}
      disableFocusRipple={true}
      disableTouchRipple={true}
      onClick={props.onClick}
    >
      {props.children}
    </IconButton>

    <span
      className={bem('Label', { ...cssMod(labelPosition) }, ['noselect'])}
      data-testid={bem('Label')}
    >
      {label}
    </span>
  </div>
)
