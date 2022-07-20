import { Transaction } from 'shared/models/transaction'
import transactionHelper from './transaction.helper'

describe('Sort transactions by days', () => {
  const transactions: Partial<Transaction>[] = [
    { timestamp: 1615458796000 },
    { timestamp: 1616097396000 },
    { timestamp: 1616327452000 },
    { timestamp: 1616409476000 },
    { timestamp: 1616410268000 },
    { timestamp: 1616571076000 },
  ]

  const result = [
    {
      date: '24 Mar 2021',
      transactions: [{ timestamp: 1616571076000 }],
    },
    {
      date: '22 Mar 2021',
      transactions: [{ timestamp: 1616410268000 }, { timestamp: 1616409476000 }],
    },
    {
      date: '21 Mar 2021',
      transactions: [{ timestamp: 1616327452000 }],
    },
    {
      date: '18 Mar 2021',
      transactions: [{ timestamp: 1616097396000 }],
    },
    {
      date: '11 Mar 2021',
      transactions: [{ timestamp: 1615458796000 }],
    },
  ]

  it('returns array of objects like { date: string, transactions: Transaction[] }', () => {
    expect(JSON.stringify(transactionHelper.sortByDays(transactions as any))).toBe(
      JSON.stringify(result),
    )
  })
})
