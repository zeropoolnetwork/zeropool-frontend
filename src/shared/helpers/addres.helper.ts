import { isEthereumAddress } from 'shared/helpers/validators/eth.validator'
import { TokenSymbol } from 'shared/models'

import api from 'wallet/api/zeropool.api'

export const validateAddress = (address: string, symbol: TokenSymbol): boolean | undefined => {
  let result
  const supportedSymbols = ['ETH', 'WAVES', 'NEAR']

  if (!supportedSymbols.includes(symbol)) {
    return undefined
  }

  switch (symbol) {
    case 'ETH':
      result = isEthereumAddress(address) || api.isPrivateAddress(address, 'ETH')
      break

    case 'WAVES':
      result = true
      break

    case 'NEAR':
      result = true
      break

    default:
      result = true
  }

  return result
}

export const beautifyAddress = (address: string, limit = 6): string => {
  let result = ''

  if (address.length > limit) {
    result = address.substring(0, limit) + '...' + address.substring(address.length - 4)
  } else result = address

  return result
}

export const beautifyAmount = (amount: string | number): string => {
  if (typeof amount === 'number') {
    amount = amount.toString()
  }

  if (amount === '0') {
    return amount
  }

  const amountNum = Number(amount)

  if (amountNum < 0.0001) {
    const lastDigit = amount[amount.length - 1]

    return `0.0...${lastDigit}`
  } else if (amount.length > 7) {
    const lastDigit = amount[amount.length - 1]
    const prefixLength = amountNum > 1 && amountNum < 1000 ? 5 : 3
    const prefix = amount.slice(0, prefixLength)

    return `${prefix}...${lastDigit}`
  }

  return amount
}
