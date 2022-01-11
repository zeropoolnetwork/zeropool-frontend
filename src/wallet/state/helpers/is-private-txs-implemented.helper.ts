import { TokenSymbol } from 'shared/models'

export const privateTxsInplemented: string[] = [
  'ETH'
]

export const isPrivateTxsInplemented = 
  (token: TokenSymbol): boolean => {
    
    return privateTxsInplemented.includes(token)
  }
