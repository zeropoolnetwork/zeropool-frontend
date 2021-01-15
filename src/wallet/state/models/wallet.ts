import { Address } from "shared/models/address";

export type Wallet = {
  address: Address; 
  amount: number; 
  name: string;
}