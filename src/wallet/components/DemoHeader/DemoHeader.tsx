import React from 'react'
import { cn } from '@bem-react/classname'
import NumberFormat from 'react-number-format'

import './DemoHeader.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'

export const componentId = 'DemoHeader'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export type DemoHeaderProps = {
  tokenAmount?: number
  privateBalance?: number
  walletAddress?: string
}

export const DemoHeader: React.FC<DemoHeaderProps> = ({
  tokenAmount,
  privateBalance,
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
            data-testid={test('TokenAmount')}
            value={tokenAmount}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' tokens'}
            decimalScale={2}
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
            decimalScale={2}
          />
        </div>
      </div>

      <div className={css('Tokens')}></div>
    </div>
  )
}
