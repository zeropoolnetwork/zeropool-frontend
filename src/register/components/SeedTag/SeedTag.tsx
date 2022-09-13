import React from 'react'
import { cn } from '@bem-react/classname'

import './SeedTag.scss'

import { shuffleString } from 'shared/utils/shuffle'

export const componentId = 'SeedTag'
const bem = cn(componentId)

export interface SeedTagProps {
  text: string
  num: number
  hidden?: boolean
  hideNumber?: boolean
  onClick?: (num: number) => void
}

export const SeedTag: React.FC<SeedTagProps> = ({ text, num, hidden, hideNumber, onClick }) => {
  const clickHandler = () => (onClick && !hidden ? onClick(num) : null)

  return (
    <div className={bem({ Placeholder: hidden })} data-testid={bem()} onClick={clickHandler}>
      {hidden || hideNumber || !Number.isInteger(num) ? null : <div className={bem('Number')}>{num + 1}</div>}

      <div className={bem('Text')}>{hidden ? shuffleString(text) : text}</div>
    </div>
  )
}
