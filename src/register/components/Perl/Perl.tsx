import React from 'react'
import { cn } from '@bem-react/classname'

import './Perl.scss'

export const componentId = 'Perl'

const css = cn(componentId)

export type PerlProps = {
  classes?: string[]
  num: number
  isActive: boolean
}

export const Perl: React.FC<PerlProps> = ({ classes = [], num, isActive }) => {
  return (
    <div className={css({ Active: isActive }, classes)}>
      <div className={css('Number')}>{num}</div>
    </div>
  )
}
