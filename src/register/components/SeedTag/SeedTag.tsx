import React from 'react'
import { cn } from '@bem-react/classname'

import './SeedTag.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { shuffleString } from 'shared/util/shuffle'

export const componentId = 'SeedTag'

const css = cn(componentId)
const test = testIdBuilder(componentId)

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
    <div className={css({ Placeholder: hidden })} data-testid={test()} onClick={clickHandler}>
      {hidden || hideNumber || !num ? null : <div className={css('Number')}>{num + 1}</div>}

      <div className={css('Text')}>{hidden ? shuffleString(text) : text}</div>
    </div>
  )
}
