import { RegisterState } from "register/state/register.reducer";
import { RootState } from "state";
import { WalletState } from "wallet/state/wallet.reducer";

export const mockAppState: {
  register: Partial<RegisterState>,
  wallet: Partial<WalletState>,
} = {
  register: {
    stage: undefined,
  },
  wallet: {
    walletName: 'Test Wallet',
    displayedTokens: { 'Test Wallet': [] },
  }
};
