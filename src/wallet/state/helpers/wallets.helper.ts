import { Wallet } from 'wallet/state/models/wallet';

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
        name: `Wallet${first.token.symbol}${wallets.length}`,
        amount: 0,
        address: first.address + wallets.length,
      }
    ];
  },

  reduceWallets: (wallets: Wallet[]): Wallet[] => {
    let lastValuableIndex = 0;

    for (let i = wallets.length - 1; i > 0; i--) {
      if (wallets[i].amount > 0) {
        lastValuableIndex = i;
        break;
      }
    }
    
    return wallets.slice(0, lastValuableIndex ? lastValuableIndex + 1 : 1);
  },

  getActiveIndex: (wallets: Wallet[], activeWallet: Wallet): number =>
    wallets.findIndex(wallet => wallet.address === activeWallet.address)
};
