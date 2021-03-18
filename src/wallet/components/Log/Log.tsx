import React from 'react'
import { cn } from '@bem-react/classname'

import './Log.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'

import { Wallet } from 'wallet/state/models'

export const componentId = 'Log'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type LogProps = {
  wallet: Wallet
}

export const Log: React.FC<LogProps> = ({ wallet }) => {
  return (
    <div className={css()} data-testid={test()}>
      <h1> Log is under construction</h1>
    </div>
  )
}
