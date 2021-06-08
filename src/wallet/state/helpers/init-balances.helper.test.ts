import { Balance, Coin, HDWallet } from 'zeropool-api-js'

import { Token, TokenSymbol } from 'shared/models'
import { initBalances } from 'wallet/state/helpers/init-balances.helper'
import { balancesMock } from 'shared/helpers/test/app-state.helper'
import { Wallet } from 'wallet/state/models'

describe('init-balances helper', () => {
  const balances: Record<TokenSymbol, Balance[]> = balancesMock
  const hdWallet: any = {
    getCoin: (tokenName: string) => ({
      fromBaseUnit: (balance: number) => balance,
    }),
  }

  const tokens: Token[] = [
    { id: 1, symbol: 'ETH', name: 'ethereum' },
    { id: 2, symbol: 'NEAR', name: 'near' },
  ]

  it('returns tokens with arrays of wallets, where first one is private', () => {
    const expectedResult: Record<TokenSymbol, Wallet[]> = {
      ETH: [
        {
          account: 0,
          address: '',
          amount: 0,
          id: 0,
          name: 'Private',
          token: { ...tokens[0] },
        },
      ],
      NEAR: [
        {
          account: 0,
          address: '',
          amount: 0,
          id: 0,
          name: 'Private',
          token: { ...tokens[1] },
        },
      ],
    }

    const result = initBalances(hdWallet, balances, tokens)

    expect(result.ETH[0]).toEqual(expectedResult.ETH[0])
  })

  it('fills wallets array with public wallets that had none-zero balances', () => {
    expect(initBalances(hdWallet, balances, tokens).ETH.length).toEqual(4)
  })

  it('names public wallets starting from 01: "Wallet 01", "Wallet 02", etc.', () => {
    expect(initBalances(hdWallet, balances, tokens).ETH[1].name).toEqual('Wallet 01')
  })
})
