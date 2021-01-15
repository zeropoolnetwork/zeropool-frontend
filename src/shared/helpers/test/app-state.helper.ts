import { RegisterState } from "register/state/register.reducer";
import { WalletState } from "wallet/state/wallet.reducer";
import { Token } from "shared/models/token";
import { WalletView } from "wallet/state/models/wallet-view";

const testToken: Token = { id: 1, symbol: 'testSymbol', name: 'testName' };

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
    activeToken: testToken,
    supportedTokens: [testToken],
    supportedTokensRecord: { [testToken.symbol]: testToken },
    usdRates: { testSymbol: 111 },
  }
};
