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

describe('Convert transaction to Transaction type', () => {
  const record: any = {
    pending: false,
    amount: 1000000000n,
    fee: 0n,
    txHash: '0x123',
    from: '0x123',
    to: '0x123',
    timestamp: 1664897388,
    type: 4,
  }

  const result: Transaction = {
    status: 'success',
    type: 'privateToPublic',
    amount: '1',
    blockHash: '0x123',
    from: '0x123',
    to: '0x123',
    timestamp: 1664897388000,
  }

  const fromBaseUnit = (value: string) => {
    return (Number(value) / 10 ** 18).toString()
  }

  const denominator = BigInt(10 ** 9)

  it('shold convert privateToPublic(3) transaction', () => {

    expect(transactionHelper.fromPrivateHistory(record, fromBaseUnit, denominator)).toEqual(result)
  })

  it('shold convert privateToPrivate transaction', () => {
    const recordPTP3 = { ...record, type: 3 }
    const resultPTP3 = { ...result, type: 'privateToPrivate' }

    expect(transactionHelper.fromPrivateHistory(recordPTP3, fromBaseUnit, denominator)).toEqual(resultPTP3)
  })

  it('shold convert privateToPrivate(2) transaction', () => {
    const recordPTP2 = { ...record, type: 2 }
    const resultPTP2 = { ...result, type: 'privateToPrivate' }

    expect(transactionHelper.fromPrivateHistory(recordPTP2, fromBaseUnit, denominator)).toEqual(resultPTP2)
  })

  it('shold convert privateToPrivate(5) transaction', () => {
    const recordPTP5 = { ...record, type: 5 }
    const resultPTP5 = { ...result, type: 'privateToPrivate' }

    expect(transactionHelper.fromPrivateHistory(recordPTP5, fromBaseUnit, denominator)).toEqual(resultPTP5)
  })
})
