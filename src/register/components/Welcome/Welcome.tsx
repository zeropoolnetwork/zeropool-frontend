import * as React from 'react'
import { Button } from '@mui/material'
import { cn } from '@bem-react/classname'

import './Welcome.scss'
import logo from 'assets/images/logo_white.png'


export const componentId = 'Welcome'
export interface WelcomeProps {
  onCreate: () => void
  onImport: () => void
  onAbout: () => void
}

const bem = cn(componentId)

export const Welcome: React.FC<WelcomeProps> = ({
  onCreate,
  onImport,
  onAbout,
}) => {
  return (
    <div className={bem()} data-testid={bem()}>
      <section className="noselect">
        <img
          src={logo}
          className={bem('Logo')}
          data-testid={bem('Logo')}
          alt="logo"
        />
      </section>

      <Button
        color="primary"
        variant="contained"
        className={bem('Button')}
        data-testid={bem('CreateButton')}
        onClick={onCreate}
      >
        Create wallet
      </Button>

      <Button
        color="primary"
        variant="contained"
        className={bem('Button')}
        data-testid={bem('ImportButton')}
        onClick={onImport}
      >
        Import wallet
      </Button>

      <Button
        color="primary"
        variant="outlined"
        className={bem('Button')}
        data-testid={bem('AboutButton')}
        onClick={onAbout}
      >
        About zeropool
      </Button>
    </div>
  )
}
