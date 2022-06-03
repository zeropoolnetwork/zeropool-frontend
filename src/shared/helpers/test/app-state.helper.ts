import { RegisterState } from 'register/state/register.reducer'
import { WalletState } from 'wallet/state/wallet.reducer'
import { WalletView } from 'wallet/state/models/wallet-view'

import { Token } from 'shared/models/token'
import { Wallet } from 'wallet/state/models'

export const _testToken: Token = { id: 1, symbol: 'ETH', name: 'testName' }

export const _testWalletsEth: Wallet[] = [
  {
    id: 0,
    account: 0,
    name: 'Private ETH',
    amount: 0,
    address: '',
    token: _testToken,
  },
  {
    id: 1,
    account: 0,
    name: 'WalletEth2',
    amount: 1.3425,
    address: 'x123222',
    token: _testToken,
  },
  {
    id: 2,
    account: 0,
    name: 'WalletEth3',
    amount: 1,
    address: 'x123111',
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
    token: { ..._testToken, symbol: 'NEAR' },
  },
  {
    id: 1,
    account: 0,
    name: 'WalletNear2',
    amount: 11,
    address: 'x123111',
    token: { ..._testToken, symbol: 'NEAR' },
  },
]

export const balancesMock = {
  ethereum: [
    {
      address: '0xA646dc3DD68338Ee960eA131cfc798D9bF66070d',
      balance: '288813499999999998',
    },
    {
      address: '0xd50033FF0F2337eC3a138B79626D651421892709',
      balance: '859286840734643000',
    },
    {
      address: '0xc87Ff446a83fc6E3376F7Da5A1302983060211c1',
      balance: '1000000000000000000',
    },
    {
      address: '0xA10D0e10cF9b854518419cbFE1C4B413502130ae',
      balance: '0',
    },
    {
      address: '0x1287126fcD64583e376B5F37F0E99A5c393E1E7F',
      balance: '0',
    },
  ],
  near: [
    {
      address: 'ca4b0ae4deb34e0342d785a6e8f41a88997540c239799978a567859692993430',
      balance: '51352267044412499999999990',
    },
    {
      address: 'bb6c209b9d8b6da06542457e94204da603d85782fbb5c50c61df517195156c41',
      balance: '0',
    },
    {
      address: 'c248ef1f84d4ec4966e446f52b3f8be20ba838f9e793c28b8c146314259dffd8',
      balance: '0',
    },
    {
      address: '412a30408099e0db780cef990503e669ec909e47e47eb02f1df1ccdb81613e54',
      balance: '0',
    },
    {
      address: 'b9fdaf8fb791458678479085529093d94e435601be118e7c487901990dcb43bd',
      balance: '0',
    },
  ],
  waves: [
    {
      address: '3MrMJPHJbhf9aAcyd2fRMKuGKCS6JcRz4HQ',
      balance: '111000000',
    },
    {
      address: '3NAWMAWRAzD3SVzGtduKjmMRtZAyUFkkR32',
      balance: '800000000',
    },
    {
      address: '3NBTQqt2duCz2QoHkerx1N7XLEt2a4v5wAL',
      balance: '0',
    },
    {
      address: '3MuxzgVy54JQoct6iBugSEsyEswVzzSJ5C8',
      balance: '0',
    },
    {
      address: '3MtUCzcoZ7PcJuf7KX3gxRfDsstGe7uM3Dz',
      balance: '0',
    },
  ],
}

export const mockAppState: {
  register: Partial<RegisterState>
  wallet: Partial<WalletState>
} = {
  register: {
    stage: undefined,
  },
  wallet: {
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
