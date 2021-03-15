import { RegisterState } from 'register/state/register.reducer'
import { WalletState } from 'wallet/state/wallet.reducer'
import { WalletView } from 'wallet/state/models/wallet-view'

import { Token } from 'shared/models/token'

export const _testToken: Token = { id: 1, symbol: 'ETH', name: 'testName' }

export const _testWalletsEth = [
  {
    id: 0,
    account: 0,
    name: 'WalletEth1',
    amount: 0,
    address: 'x12322',
    token: _testToken,
    private: false,
  },
  {
    id: 1,
    account: 0,
    name: 'WalletEth2',
    amount: 1.3425,
    address: 'x123222',
    token: _testToken,
    private: false,
  },
  {
    id: 2,
    account: 0,
    name: 'WalletEth3',
    amount: 1,
    address: 'x123111',
    private: true,
    token: _testToken,
  },
]

export const _testWalletsNear = [
  {
    id: 0,
    account: 0,
    name: 'WalletNear1',
    amount: 22.3,
    address: 'x123222',
    private: false,
    token: { ..._testToken, symbol: 'NEAR' },
  },
  {
    id: 1,
    account: 0,
    name: 'WalletNear2',
    amount: 11,
    address: 'x123111',
    private: true,
    token: { ..._testToken, symbol: 'NEAR' },
  },
]
export const mockAppState: {
  register: Partial<RegisterState>
  account: Partial<WalletState>
} = {
  register: {
    stage: undefined,
  },
  account: {
    amounts: { testToken: 1 },
    activeView: WalletView.About,
    activeToken: _testToken,
    supportedTokens: [_testToken],
    supportedTokensRecord: { [_testToken.symbol]: _testToken },
    usdRates: { ETH: 111 },
    wallets: {
      ETH: _testWalletsEth,
      NEAR: _testWalletsNear,
      WAVES: [],
    },
  },
}
