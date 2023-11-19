import { Transaction } from 'shared/models/transaction'
import transactionHelper from './transaction.helper'

jest.mock('wallet/state/models/sorted-transactions')
jest.mock('wallet/state/models/sorted-transactions')

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

describe('Convert transaction type from number to TransactionType type value', () => {
  const transaction: any = {
    pending: false,
    amount: 1000000000n,
    fee: 0n,
    txHash: '0x123',
    from: '0x123',
    to: '0x123',
    timestamp: 1664897388,
    type: 4,
  }

  const outSource: Record<string, string | number> = {
    status: 'success',
    type: 'withdraw',
    amount: '1',
    blockHash: '0x123',
    from: '0x123',
    to: '0x123',
    timestamp: 1664897388000,
  }

  const out = (
    mod: Record<string, string | number> = {},
  ): Promise<Record<string, string | number>> =>
    new Promise((resolve) => ({
      ...outSource,
      ...mod,
    }))

  const fromBaseUnit = (value: string): Promise<string> => {
    return Promise.resolve((Number(value) / 10 ** 18).toString())
  }

  const denominator = BigInt(10 ** 9)

  it('shold convert withdraw(4) transaction type', () => {
    const source = transaction

    expect(
      transactionHelper.fromPrivateHistory(source, fromBaseUnit, denominator),
    ).toEqual(out())
  })

  it('shold convert privateToPrivateOut transaction type', () => {
    const source = { ...transaction, type: 3 }

    expect(
      transactionHelper.fromPrivateHistory(source, fromBaseUnit, denominator),
    ).toEqual(out({ type: 'privateToPrivateOut' }))
  })

  it('shold convert privateToPrivateIn(2) transaction type', () => {
    const source = { ...transaction, type: 2 }

    expect(
      transactionHelper.fromPrivateHistory(source, fromBaseUnit, denominator),
    ).toEqual(out({ type: 'privateToPrivateIn' }))
  })

  it('shold convert loopback(5) transaction type', () => {
    const source = { ...transaction, type: 5 }

    expect(
      transactionHelper.fromPrivateHistory(source, fromBaseUnit, denominator),
    ).toEqual(out({ type: 'loopback' }))
  })
})
