import { isEthereumAddress } from 'shared/helpers/validators/eth.validator'
import { TokenSymbol } from 'shared/models'
import { toPlainString } from 'shared/utils/toPlainString'

export const validateAddress = (address: string, symbol: TokenSymbol): boolean | undefined => {
  let result
  const supportedSymbols = ['ETH', 'WAVES', 'NEAR']

  if (!supportedSymbols.includes(symbol)) {
    return undefined
  }

  switch (symbol) {
    case 'ETH':
      result = isEthereumAddress(address) // || api.isPrivateAddress(address, 'ETH')
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
    amount = toPlainString(amount)
  }

  if (!amount || amount === '0') {
    return amount
  }

  const amountNum = Number(amount)

  if (amountNum < 0.00000001) {
    const lastDigit = amount.slice(-4)

    return `0.0...${lastDigit}`
  } else if (amountNum > 0.000000001 && amountNum < 1 && amount.length > 11) {
    const prefixLength = 10
    const prefix = amount.slice(0, prefixLength)

    return `${prefix.replace(/0+$/g, '')}...`
  } else if (amount.length > 7 && amountNum > 1 && amountNum < 1000) {
    const prefixLength = 7
    const prefix = amount.slice(0, prefixLength)

    return `${prefix.replace(/0+$/g, '')}...`
  } else if (amountNum > 9999999) {
    const prefixLength = 8
    const prefix = amount.slice(0, prefixLength)

    return `${prefix.replace(/0+$/g, '')}...`
  }

  return amount
}
