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
  privateAmount?: number
}

export const DemoHeader: React.FC<DemoHeaderProps> = ({
  tokenAmount,
  privateAmount,
}) => {

  return (
    <div className={css()} data-testid={test()}>
      <div className={css('Title')}>
        <span>Balances</span>
      </div>

      <div className={css('Amounts')}>
        <NumberFormat
          className={css('Amount')}
          data-testid={test('TokenAmount')}
          value={tokenAmount}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' $'}
          decimalScale={2}
        />

        <NumberFormat
          className={css('Amount')}
          data-testid={test('PrivateAmount')}
          value={privateAmount}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' $'}
          decimalScale={2}
        />
      </div>

      <div className={css('Tokens')}>
      </div>
    </div>
  )
}
