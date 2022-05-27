import React from 'react'
import { cn } from '@bem-react/classname'
import { Tooltip } from '@mui/material'
import NumberFormat from 'react-number-format'

import './TokenRow.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { IconOption } from 'shared/components/Icon/IconOption'
import { Token } from 'shared/models/token'
import { Icon } from 'shared/components/Icon/Icon'
import { beautifyAmount } from 'shared/helpers/addres.helper'

export const componentId = 'TokenRow'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export interface TokenRowProps {
  amount: number
  onSelectToken: (token: Token) => void
  rate: number
  token: Token
}

export const TokenRow: React.FC<TokenRowProps> = ({ amount = 0, token, rate, onSelectToken }) => {
  return (
    <div
      className={css({}, ['noselect'])}
      data-testid={test()}
      onClick={() => onSelectToken(token)}
    >
      <div className={css('Rates')}>
        <Icon icon={token.symbol as IconOption} />

        <span className={css('Name')}>{token.name}</span>

        <NumberFormat
          className={css('Rate')}
          data-testid={test('Rate')}
          value={rate}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' $'}
          decimalScale={2}
        />
      </div>

      <div className={css('Amounts')}>
        <Tooltip title={`Balance: ${amount} ${token.symbol}`} placement="bottom">
          <div className={css('TokenAmount')} data-testid={test('TokenAmount')}>
            {beautifyAmount(amount)} {token.symbol}
          </div>
        </Tooltip>

        <NumberFormat
          className={css('FiatAmount')}
          data-testid={test('FiatAmount')}
          value={amount * rate}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' $'}
          decimalScale={2}
        />
      </div>
    </div>
  )
}
