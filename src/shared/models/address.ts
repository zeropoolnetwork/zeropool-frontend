export interface Address {
  networkId: number;
  private: string;
  public: string;

  send: (amount: number, to: string, priv?: boolean) => void;

  balance: (priv?: boolean) => number;
}