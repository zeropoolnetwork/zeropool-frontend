import { WalletView } from "wallet/state/models/wallet-view";

export const navigationHelper = {
  handleBackClick: (current: WalletView, prev?: WalletView): WalletView => {
    if (prev) {
      return prev;
    }

    switch (current) {
      case WalletView.Help:
        return WalletView.Balance;

      default:
        return WalletView.Balance;
    }

  }
}
