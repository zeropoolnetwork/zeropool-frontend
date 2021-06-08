import { Token } from 'shared/models'

export type Wallet = {
  account: number
  address: string
  amount: number
  id: number
  name: string
  token: Token
}
