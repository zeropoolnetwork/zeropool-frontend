import { Transaction } from 'shared/models/transaction';

export const transactionsMock: Transaction[] = [
   {
      type: 'publicToPublic',
      status: 'success',
      amount: '10',
      from: '0x123',
      to: '0x456',
      timestamp: 1663831111000,
   },
   {
      type: 'privateToPublic',
      status: 'success',
      amount: '5',
      from: '0x124',
      to: '0x123',
      timestamp: 1663831157840,
   },
]