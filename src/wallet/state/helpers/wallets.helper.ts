import { Wallet } from "wallet/state/models/wallet";

export const walletsHelper = {
  renameWallet: (wallets: Wallet[], wallet: Wallet, name: string): Wallet[] => {
    const result: Wallet[] = [];

    for (const _wallet of wallets) {
      if (_wallet === wallet) {
        result.push({
          ..._wallet,
          name,
        })
      } else {
        result.push(_wallet);
      }
    }

    return result;
  },

  hideWallet: (wallets: Wallet[], wallet: Wallet) => {
    const result: Wallet[] = [];

    for (const _wallet of wallets) {
      if (_wallet !== wallet) {
        result.push(_wallet)
      }
    }

    return result;
  },

  addWallet: (wallets: Wallet[]): Wallet[] => {
    const first: Wallet = wallets[0];

    return [
      ...wallets,
      {
        ...first,
        name: `Wallet${first.address.symbol}${wallets.length}`,
        amount: 0,
        address: {
          ...first.address,
          value: first.address.value + wallets.length,
        }
      }
    ];
  },
};
