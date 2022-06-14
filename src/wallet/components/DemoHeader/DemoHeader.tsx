import React from 'react'
import { cn } from '@bem-react/classname'
import NumberFormat from 'react-number-format'

import './DemoHeader.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'

export const componentId = 'DemoHeader'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type DemoHeaderProps = {
  publicBalance?: number
  privateBalance?: number
  tokenBalance?: number
  walletAddress?: string
}

export const DemoHeader: React.FC<DemoHeaderProps> = ({
  publicBalance,
  privateBalance,
  tokenBalance,
  walletAddress,
}) => {
  return (
    <div className={css()} data-testid={test()}>

      <div className={css('Title')}>
        <span>Address: {walletAddress}</span>
      </div>

      <div className={css('Amounts')}>
        <div>
          Public balance:

          <NumberFormat
            className={css('Amount')}
            data-testid={test('PublicAmount')}
            value={publicBalance}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' tokens'}
            decimalScale={10}
          />
        </div>

        <div className={css('Amounts')}>
          <div>
            Token balance:

            <NumberFormat
              className={css('Amount')}
              data-testid={test('')}
              value={tokenBalance}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' tokens'}
              decimalScale={10}
            />
          </div>

          <div>
            Private balance:

            <NumberFormat
              className={css('Amount')}
              data-testid={test('PrivateAmount')}
              value={privateBalance}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' tokens'}
              decimalScale={10}
            />
          </div>
        </div>

        <div className={css('Tokens')}></div>
      </div>
    </div>
  )
}
