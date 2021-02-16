import { Address } from "shared/models/address";

export type Wallet = {
  account: number;
  address: Address;
  amount: number;
  name: string;
};
