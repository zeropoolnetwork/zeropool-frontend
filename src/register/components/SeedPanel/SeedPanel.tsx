import { cn } from '@bem-react/classname'
import { Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'

import './SeedPanel.scss'

import { shuffleArray } from 'shared/utils/shuffle'
import { SeedTag } from 'register/components/SeedTag/SeedTag'

export const componentId = 'SeedPanel'
const bem = cn(componentId)

export interface SeedPanelProps {
  classes?: string[]
  seed: string[]
  check?: boolean
  onCheck?: (checked: boolean) => void
}

export const SeedPanel: React.FC<SeedPanelProps> = ({ classes = [], seed, check, onCheck }) => {
  const [confirmedSeed, setConfirmedSeed] = useState([] as string[])
  const [success, setSuccess] = useState(false)
  const [shuffledSeed, setShuffledSeed] = useState([] as string[])

  useEffect(() => {
    if (!shuffledSeed.length && check) {
      setShuffledSeed(shuffleArray([...seed]))
    }
  }, [shuffledSeed.length, check, seed])

  useEffect(() => {
    const same = JSON.stringify(seed) === JSON.stringify(confirmedSeed)
    setSuccess(same)
    if (onCheck) {
      onCheck(same)
    }
  }, [success, confirmedSeed, seed, onCheck])

  const bodyTagClickHandler = (index: number) => {
    confirmedSeed.splice(index, 1)
    setConfirmedSeed([...confirmedSeed])
    setSuccess(false)
  }
  const footerTagClickHandler = (index: number) => {
    setConfirmedSeed([...confirmedSeed, seed[index]])
  }

  return (
    <Paper className={bem('', classes)} data-testid={bem()}>
      <div className={bem('Body')} data-testid={bem('Body')}>
        {check
          ? confirmedSeed.map((tag: string, index: number) => (
              <SeedTag text={tag} num={index} key={index} onClick={bodyTagClickHandler} />
            ))
          : seed.map((tag: string, index: number) => (
              <SeedTag text={tag} num={index} key={index} />
            ))}
      </div>

      <div className={bem('Footer')} data-testid={bem('Footer')}>
        {check
          ? shuffledSeed.map((tag: string, index: number) => (
              <SeedTag
                text={tag}
                num={seed.findIndex((str) => str === tag)}
                hidden={confirmedSeed.includes(tag)}
                hideNumber={true}
                key={seed.findIndex((str) => str === tag)}
                onClick={footerTagClickHandler}
              />
            ))
          : null}
        {confirmedSeed.length === seed.length && !success ? (
          <div className={bem('Warning')} data-testid={bem('Warning')}>
            The phrases do not match!
          </div>
        ) : null}
      </div>
    </Paper>
  )
}
