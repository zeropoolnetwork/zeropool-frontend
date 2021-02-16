import { RegisterState } from "register/state/register.reducer";
import { WalletState } from "wallet/state/wallet.reducer";
import { Token } from "shared/models/token";
import { WalletView } from "wallet/state/models/wallet-view";
import { Address } from "shared/models/address";

const _testToken: Token = { id: 1, symbol: 'ETH', name: 'testName' };

export const _testAddress: Address = { symbol: 'ETH', value: 'x123333', private: false };

export const _testWalletsEth = [
  { account: 0, name: 'WalletEth1', amount: 0, address: _testAddress },
  { account: 0, name: 'WalletEth2', amount: 1.3425, address: { ..._testAddress, value: 'x123222' } },
  { account: 0, name: 'WalletEth3', amount: 1, address: { ..._testAddress, value: 'x123111', private: true } },
]

export const _testWalletsNear = [
  { account: 0, name: 'WalletNear1', amount: 22.3, address: { symbol: 'NEAR', value: 'x123222', private: false } },
  { account: 0, name: 'WalletNear2', amount: 11, address: { symbol: 'NEAR', value: 'x123111', private: true } },
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
