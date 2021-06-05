import { cn } from '@bem-react/classname'
import { IconButton } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import React, { HTMLAttributes } from 'react'

import './ExpandButton.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'

export const componentId = 'ExpandButton'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export interface ExpendButtonProps extends HTMLAttributes<HTMLElement> {
  expanded: boolean
  click: () => void
}

export const ExpandButton: React.FC<ExpendButtonProps> = ({ expanded, click, ...props }) => {
  return (
    <div
      className={css({ Expended: expanded }, [props.className])}
      data-testid={test()}
      onClick={click}
    >
      <IconButton disableRipple={true} disableFocusRipple={true} disableTouchRipple={true}>
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  )
}
