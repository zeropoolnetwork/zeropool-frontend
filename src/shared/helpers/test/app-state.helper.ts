import { RegisterState } from "register/state/register.reducer";
import { WalletState } from "wallet/state/wallet.reducer";
import { Token } from "shared/models/token";
import { WalletView } from "wallet/state/models/wallet-view";

const _testToken: Token = { id: 1, symbol: 'ETH', name: 'testName' };

export const _testWalletsEth = [
  { name: 'WalletEth1', amount: 0, address: {symbol: 'ETH', value: 'x123333', private: false}},
  { name: 'WalletEth2', amount: 1.3425, address: {symbol: 'ETH', value: 'x123222', private: false}},
  { name: 'WalletEth3', amount: 1, address: {symbol: 'ETH', value: 'x123111', private: true}},
]

export const _testWalletsNear = [
  { name: 'WalletNear1', amount: 22.3, address: {symbol: 'NEAR', value: 'x123222', private: false}},
  { name: 'WalletNear2', amount: 11, address: {symbol: 'NEAR', value: 'x123111', private: true}},
]
export const mockAppState: {
  register: Partial<RegisterState>,
  account: Partial<WalletState>,
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
  }
};
