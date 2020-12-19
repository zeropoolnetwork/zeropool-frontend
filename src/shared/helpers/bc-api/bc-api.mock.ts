import { AccountStatus } from "shared/models/account-status";
import { Wallet } from "shared/models/wallet";

export const bsApiMock = {
  status: async (status: AccountStatus) => await status || AccountStatus.None,
  wallets: async (wallets: Wallet[]) => await wallets || [],
}