import React from 'react'
import { cn } from '@bem-react/classname'

import './HelpPage.scss'

export const componentId = 'HelpPage'

const bem = cn(componentId)

export type HelpPageProps = {}

export const HelpPage: React.FC<HelpPageProps> = () => {
  return (
    <div className={bem()} data-testid={bem()}>
      <h2> Wallet is in test mode. How to start:</h2>

      <p>
        We use Goerli test network to emulate operations with Ethereum and standard Near's test
        network for the Near. Operations with Waves are not yet implemented.
      </p>

      <h3>Ethereum</h3>

      <p>
        To try it out you can install Metamask, select Goerli network, get some free Eth from the
        <a href="https://gitter.im/goerli-testnet/faucet#" target="_blank" rel="noopener noreferrer">
          {' '}goerli faucet{' '}
        </a>
        and send it to your Zero Pool <b>Eth</b> Wallet's address.
      </p>

      <h3>Near</h3>

      <p>
        You can register
        <a href="https://wallet.testnet.near.org/" target="_blank" rel="noopener noreferrer">
          {' '}
          Near test wallet{' '}
        </a>
        and send tokens recieved upon registration to one of your Zero Pool <b>Near</b> Wallet's
        address and back.
      </p>

      <h3>Waves</h3>

      <p>Operations with Waves are on final stage of implementation.</p>
    </div>
  )
}
