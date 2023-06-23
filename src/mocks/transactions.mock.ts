import { Transaction } from 'shared/models/transaction'

export const transactionsMock: Transaction[] = [
  {
    type: 'funds',
    status: 'success',
    amount: '0.000000000000000001',
    from: '0xaac9012A78a1aD0393Ac07fbeEa4520008aAb188',
    to: '0xaac9012A78a1aD0393Ac07fbeEa4520008aAb188',
    timestamp: 1663831111000,
  },
  {
    type: 'privateToPublic',
    status: 'success',
    amount: '5',
    from: '0xaac9012A78a1aD0393Ac07fbeEa4520008aAb188',
    to: 's87d6f98sa7d7f987as987df987as987fd98a7sdf9',
    timestamp: 1063811157840,
  },
]
