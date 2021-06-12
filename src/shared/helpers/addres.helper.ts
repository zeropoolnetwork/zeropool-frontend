import { isEthereumAddress } from 'shared/helpers/validators/eth.validator'
import { TokenSymbol } from 'shared/models'

export const validateAddress = (address: string, symbol: TokenSymbol): boolean | undefined => {
  let result
  const supportedSymbols = ['ETH', 'WAWES', 'NEAR']

  if (!supportedSymbols.includes(symbol)) {
    return undefined
  }

  switch (symbol) {
    case 'ETH':
      result = isEthereumAddress(address)
      break

    case 'WAVES':
      result = true
      break

    case 'NEAR':
      result = true
      break
  }

  return result
}

export const beautifyAdress = (address: string, limit = 6): string => {
  let result = ''

  if (address.length > limit) {
    result = address.substring(0, limit) + '...' + address.substring(address.length - 4)
  } else result = address

  return result
}
