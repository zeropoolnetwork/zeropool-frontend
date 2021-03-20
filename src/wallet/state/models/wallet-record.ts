import { TokenSymbol } from 'shared/models'
import { Wallet } from './wallet'

export type WalletRecord = Record<TokenSymbol, Wallet[]>
