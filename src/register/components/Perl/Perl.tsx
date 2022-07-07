import React from 'react'
import { cn } from '@bem-react/classname'

import './Perl.scss'

export const componentId = 'Perl'
const bem = cn(componentId)

export type PerlProps = {
  classes?: string[]
  num: number
  isActive: boolean
}

export const Perl: React.FC<PerlProps> = ({ classes = [], num, isActive }) => {
  return (
    <div className={bem({ Active: isActive }, classes)}>
      <div className={bem('Number')}>{num}</div>
    </div>
  )
}
