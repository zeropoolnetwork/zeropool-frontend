import { PublicHistorySourceRecord } from 'wallet/state/helpers/transaction.helper'

export type NearblocksTransactionSource = {
  receipt_id: string // 'Gjin8gywtDMBGTzjiJS8xRRtms7CYVLw3Xut7WoQeiJg',
  predecessor_account_id: string // 'system',
  receiver_account_id: string // 'apegov.testnet',
  transaction_hash: string // '4b3obFs9RuWmsyW9qKKCwDMcmSY8peCwwPhVPLBYQhx8',
  included_in_block_hash: string // '6HM8rFHs5qThmCqoEUgACTQpPZXR8J1ukZ4mtroAgUmp',
  block_timestamp: string // '1683188562523602730',
  block: {
    block_height: number // 125650424,
  }
  actions: [
    {
      action: string // 'TRANSFER',
      method: string | null // null,
    },
  ]
  actions_agg: {
    deposit: number // 1e24,
  }
  outcomes: {
    status: boolean // true,
  }
  outcomes_agg: {
    transaction_fee: number // 800699814763500000000,
  }
  logs: string[]
}

const getTransactionsUrl = (address: string, key: string) =>
  'https://api-testnet.nearblocks.io/v1/account/' +
  address +
  '/txns' +
  '?page=1' +
  // '&per_page=200' +
  '&order=desc'

export const fetchTransactions = (
  address: string,
  key = 'YourApiKeyToken',
): Promise<any[]> =>
  fetch(getTransactionsUrl(address, key)).then((data) =>
    data
      .clone()
      .json()
      .then((response) => response.txns)
      .then((data) => data.filter((tr: any) => tr.actions_agg?.deposit !== 0))
      .then((data) => data.filter((tr: any) => tr.actions[0]?.action === 'TRANSFER'))
      .then((data) => data.map(convertToPublicTransactionSource)),
  )

export const getAllHistory = async (
  tokenAddress?: string,
  apiKey?: string,
): Promise<any[]> => {
  const address = await Promise.resolve(tokenAddress || 'near')
  const fundTransactions = await fetchTransactions(address, apiKey)

  return fundTransactions
}

export const convertToPublicTransactionSource = (
  tx: NearblocksTransactionSource,
): PublicHistorySourceRecord => {
  return {
    blockHash: tx.included_in_block_hash,
    blockNumber: tx.block.block_height.toString(),
    hash: tx.transaction_hash,
    timeStamp: tx.block_timestamp,
    nonce: '0',
    transactionIndex: '0',
    from: tx.predecessor_account_id,
    to: tx.receiver_account_id,
    value: tx.actions_agg.deposit.toString(),
    gas: '0',
    gasPrice: '0',
    input: '',
    methodId: '',
    functionName: '',
    contractAddress: '',
    txreceipt_status: '1',
    gasUsed: '0',
    confirmations: '0',
    isError: '0',
  }
}

const sepoliaExample = {
  blockNumber: '7809762',
  blockHash: '0x71c2cd9dc87389ab5b6d12f1d13186be35e9e38e527b30f20cbcba2177a105fa',
  timeStamp: '1666376844',
  hash: '0x193ff2d91d5d3e5756a2617c58793cce7ca226bcf141470b7b8f5b463b961b68',
  nonce: '1',
  transactionIndex: '5',
  from: '0xc2dd4ad652ad13656658244aebf152b0a725edf5',
  to: '0xcda2b3489acdb31a428bd33fcaee5c7c50919b35',
  value: '0',
  gas: '46608',
  gasPrice: '14557312710',
  input:
    '0x095ea7b3000000000000000000000000c40dd5b1250f4a7e70e1823d1d8eabea247cb1b3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  methodId: '0x095ea7b3',
  functionName: 'approve(address spender, uint256 tokens)',
  contractAddress: '',
  cumulativeGasUsed: '298921',
  txreceipt_status: '1',
  gasUsed: '46608',
  confirmations: '1535075',
  isError: '0',
}

export const mockedResponse = {
  txns: [
    {
      receipt_id: '5YfapHf2JKQZGHywc19FUCLFyrieQMZCbvib5rCDZTei',
      predecessor_account_id: 'system',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: '6R3vTy9mN4ZhTV9wyR58Wm2s4a1sq1ymS9Mcr6qFVweo',
      included_in_block_hash: 'cdZDs7ZGpTDnndirD67EB2BnK9YMkGamibT7djx27Kk',
      block_timestamp: '1683189101564585235',
      block: {
        block_height: 125651173,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 2e24,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 772296891611700000000,
      },
      logs: [],
    },
    {
      receipt_id: 'FSJ7KwgBFFhAHNbDXndvCw72sXb2XmgNgTQozjp4t4GE',
      predecessor_account_id: 'apegov.testnet',
      receiver_account_id: 'zeropool.voidxnull2.testnet',
      transaction_hash: '6R3vTy9mN4ZhTV9wyR58Wm2s4a1sq1ymS9Mcr6qFVweo',
      included_in_block_hash: 'cdZDs7ZGpTDnndirD67EB2BnK9YMkGamibT7djx27Kk',
      block_timestamp: '1683189101564585235',
      block: {
        block_height: 125651173,
      },
      actions: [
        {
          action: 'FUNCTION_CALL',
          method: 'lock',
        },
      ],
      actions_agg: {
        deposit: 2e24,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 772296891611700000000,
      },
      logs: [],
    },
    {
      receipt_id: 'Gjin8gywtDMBGTzjiJS8xRRtms7CYVLw3Xut7WoQeiJg',
      predecessor_account_id: 'system',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: '4b3obFs9RuWmsyW9qKKCwDMcmSY8peCwwPhVPLBYQhx8',
      included_in_block_hash: '6HM8rFHs5qThmCqoEUgACTQpPZXR8J1ukZ4mtroAgUmp',
      block_timestamp: '1683188562523602730',
      block: {
        block_height: 125650424,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 1e24,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 800699814763500000000,
      },
      logs: [],
    },
    {
      receipt_id: '4jbtqBYYL7rwcV8YQrGTXjYpEXzJN24GkzbcZrMiaeLa',
      predecessor_account_id: 'apegov.testnet',
      receiver_account_id: 'zeropool.voidxnull2.testnet',
      transaction_hash: '4b3obFs9RuWmsyW9qKKCwDMcmSY8peCwwPhVPLBYQhx8',
      included_in_block_hash: '6HM8rFHs5qThmCqoEUgACTQpPZXR8J1ukZ4mtroAgUmp',
      block_timestamp: '1683188562523602730',
      block: {
        block_height: 125650424,
      },
      actions: [
        {
          action: 'FUNCTION_CALL',
          method: 'lock',
        },
      ],
      actions_agg: {
        deposit: 1e24,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 800699814763500000000,
      },
      logs: [],
    },
    {
      receipt_id: 'ENDe7nzhCAfCHM1dS8gUWby1HvLJ6AAYwxgseoiNdrer',
      predecessor_account_id: 'apegov.testnet',
      receiver_account_id: 'zeropool.voidxnull2.testnet',
      transaction_hash: '8ogqWvy9JCykW3CHfcRCLEZFYJKyEgTRrQJcPfko7v7J',
      included_in_block_hash: 'C8k9MXf9Mwc6sRcHWsxjZHcdpGq3gS66gzkxnffymAhp',
      block_timestamp: '1683120128758285001',
      block: {
        block_height: 125572436,
      },
      actions: [
        {
          action: 'FUNCTION_CALL',
          method: 'lock',
        },
      ],
      actions_agg: {
        deposit: 3e24,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 796919212299300000000,
      },
      logs: [],
    },
    {
      receipt_id: 'GuRPbpVUzdhcswYzMkGgGoUABQLqzLJYamr6ea5qSsxT',
      predecessor_account_id: 'system',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: '8ogqWvy9JCykW3CHfcRCLEZFYJKyEgTRrQJcPfko7v7J',
      included_in_block_hash: 'C8k9MXf9Mwc6sRcHWsxjZHcdpGq3gS66gzkxnffymAhp',
      block_timestamp: '1683120128758285001',
      block: {
        block_height: 125572436,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 3e24,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 796919212299300000000,
      },
      logs: [],
    },
    {
      receipt_id: 'CeUWUDqS9qoYsZtNWmCGRBPMiatM25nZcbKD44iU3293',
      predecessor_account_id: 'voidxnull-zp-faucet.testnet',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: '8FkAdgyybEwrhHTR9Lhn6ZXDR75jzdabmRwjZ6o46JVc',
      included_in_block_hash: 'BFEBWP3F5td6HKQhfXEW2FHwJehpNbjehRd6mRRgKXmV',
      block_timestamp: '1683118082499627421',
      block: {
        block_height: 125570716,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 4e24,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 44636512500000000000,
      },
      logs: [],
    },
    {
      receipt_id: 'FJABmwV263xvBkkSPwB2h7LFwvfCrVCfXYY3DiUUQ2R9',
      predecessor_account_id: 'system',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: '3ikcjRVDRzHqBjgDEyzGsiVEdeH7tgfs6JQMuYrrkLzF',
      included_in_block_hash: 'B8K1ENUE32HXtjqMDRdRBXaCyp6GJ7XE6woSgfUWSgJ3',
      block_timestamp: '1677865022727180701',
      block: {
        block_height: 118965675,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 9e24,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 769123957682400000000,
      },
      logs: [],
    },
    {
      receipt_id: 'BsXeKVBtbhHZe7mQZ7gLg4fcBs4doiCPpYfhHne4XPku',
      predecessor_account_id: 'apegov.testnet',
      receiver_account_id: 'zeropool.voidxnull2.testnet',
      transaction_hash: '3ikcjRVDRzHqBjgDEyzGsiVEdeH7tgfs6JQMuYrrkLzF',
      included_in_block_hash: 'B8K1ENUE32HXtjqMDRdRBXaCyp6GJ7XE6woSgfUWSgJ3',
      block_timestamp: '1677865022727180701',
      block: {
        block_height: 118965675,
      },
      actions: [
        {
          action: 'FUNCTION_CALL',
          method: 'lock',
        },
      ],
      actions_agg: {
        deposit: 9e24,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 769123957682400000000,
      },
      logs: [],
    },
    {
      receipt_id: '2zndpvjMoL6Vs1x75pbUsbV2x6qKtkbYYZ8NtwPJHW2e',
      predecessor_account_id: 'system',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: 'AczmopUUzUFkwaUeSh3duANEPMPFHtBXXvf9b1Qmkecc',
      included_in_block_hash: '3S9o92gJMzPtcrBVbVRCmSGKydJzyQxBAb6Ywux5yN5q',
      block_timestamp: '1677864185768321682',
      block: {
        block_height: 118964381,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 5e24,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 743040133217700000000,
      },
      logs: [],
    },
    {
      receipt_id: 'CZh331ZtAASphsMdEQt8mh2q68hPYZPga5betk3E8DUN',
      predecessor_account_id: 'apegov.testnet',
      receiver_account_id: 'zeropool.voidxnull2.testnet',
      transaction_hash: 'AczmopUUzUFkwaUeSh3duANEPMPFHtBXXvf9b1Qmkecc',
      included_in_block_hash: '3S9o92gJMzPtcrBVbVRCmSGKydJzyQxBAb6Ywux5yN5q',
      block_timestamp: '1677864185768321682',
      block: {
        block_height: 118964381,
      },
      actions: [
        {
          action: 'FUNCTION_CALL',
          method: 'lock',
        },
      ],
      actions_agg: {
        deposit: 5e24,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 743040133217700000000,
      },
      logs: [],
    },
    {
      receipt_id: '9LHeFYpu58CKCQJsLWTabaBejvrRp2sB8P3hd8nUK1pd',
      predecessor_account_id: 'voidxnull-zp-faucet.testnet',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: 'DVCrkZSarGpBonHdg9fRsf7A5zYiaVfRUxqN6SHsxrxx',
      included_in_block_hash: 'GSX5B93kxDru9Gfa5rnuAGTj34AYNxTBkGnno4PKT2uc',
      block_timestamp: '1670516919313281198',
      block: {
        block_height: 107872276,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 1e23,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 44636512500000000000,
      },
      logs: [],
    },
    {
      receipt_id: '3TfVRdTR7Ksq9Sq7yyN5UsvWznVnKXMFFbnGNiDNd5oD',
      predecessor_account_id: 'voidxnull-zp-faucet.testnet',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: '6MZpSY3djPA9zcVWhsZeyWMGX54jsiueZVAnBxU1orKK',
      included_in_block_hash: '96MfyfR4nomwTKHK6ACgY8Fhh2ZDVbg8QnxN399KeREJ',
      block_timestamp: '1670508748090420728',
      block: {
        block_height: 107859295,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 1e23,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 44636512500000000000,
      },
      logs: [],
    },
    {
      receipt_id: 'BSKVN7rVSn1DTzfEB1KXJKpfrhKCHvnWpnep2xBQFRp2',
      predecessor_account_id: 'voidxnull-zp-faucet.testnet',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: '33WPSjU4XVczpq7R7617qUHktZPxmqttCNmc2wLwn3EK',
      included_in_block_hash: 'ENXXvE8zoHv9uk4G9zRRfzg57rCmQYmCre2ALoEcud2Y',
      block_timestamp: '1670508737421716521',
      block: {
        block_height: 107859279,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 1e23,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 44636512500000000000,
      },
      logs: [],
    },
    {
      receipt_id: 'GyaUK97K5rPyXEM4KkDPox2yvwfREB2uPYpxoCy4FhB9',
      predecessor_account_id: 'voidxnull-zp-faucet.testnet',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: 'B1TAL7qZ2bXwZyHymryquDJyzyYFfjFmze34iXNv9jGo',
      included_in_block_hash: 'HQbsyP9rpXzu2QdfDDgHD4inKQLsmrduQ6y5xQXvqZYH',
      block_timestamp: '1670498074614073144',
      block: {
        block_height: 107842212,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 1e23,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 44636512500000000000,
      },
      logs: [],
    },
    {
      receipt_id: 'As8Lrd2BkXnfjoff9pFWta82paT1aoeDgT1mVxeae3Gc',
      predecessor_account_id: 'voidxnull-zp-faucet.testnet',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: '8p5d1ht4VDMRJQS48tDjnFDkwVzPFNfXFWA3kfgqQctV',
      included_in_block_hash: '8avRUzpEi9EFJ7J3zVCaoJt9Ua91JuBERF25qGixRN9Y',
      block_timestamp: '1670496375256724166',
      block: {
        block_height: 107839518,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 5e24,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 44636512500000000000,
      },
      logs: [],
    },
    {
      receipt_id: '9DgXiH6ZBSu5j7cJ9i2kvAjyvdiSseEsJMNi9KYrKwNP',
      predecessor_account_id: 'voidxnull-zp-faucet.testnet',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: 'uhTk122T7GcHDsadyFBBCCd8xj6pKe4YiTDA1SLUcu1',
      included_in_block_hash: 'E6ZVN7zMrwAooMCUoicGQUaAr46La655i2dbzYfHXs3N',
      block_timestamp: '1670494156739922325',
      block: {
        block_height: 107835961,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 5e24,
      },
      outcomes: {
        status: true,
      },
      outcomes_agg: {
        transaction_fee: 44636512500000000000,
      },
      logs: [],
    },
    {
      receipt_id: 'YvCm8JeazcSooskPa2Q36Ez4bnSA5j54Rp5fJGGd7H4',
      predecessor_account_id: 'apegov.testnet',
      receiver_account_id: '777',
      transaction_hash: '9UCEs6dHKF6MKTYMktea6yQSaJ919Jc8WXdLSdgEPEbA',
      included_in_block_hash: '7W4SFg8JX6fsSZwViTh2562KHMiSzPRMN3xyZDFfiu8v',
      block_timestamp: '1669198653221412695',
      block: {
        block_height: 105857388,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 1e24,
      },
      outcomes: {
        status: false,
      },
      outcomes_agg: {
        transaction_fee: 44636512500000000000,
      },
      logs: [],
    },
    {
      receipt_id: '7j9MXKeg82xGd5bs9Pcwwxcu9UXwtQWUBMXGHp2e3ghb',
      predecessor_account_id: 'system',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: '9UCEs6dHKF6MKTYMktea6yQSaJ919Jc8WXdLSdgEPEbA',
      included_in_block_hash: '7W4SFg8JX6fsSZwViTh2562KHMiSzPRMN3xyZDFfiu8v',
      block_timestamp: '1669198653221412695',
      block: {
        block_height: 105857388,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 1e24,
      },
      outcomes: {
        status: false,
      },
      outcomes_agg: {
        transaction_fee: 44636512500000000000,
      },
      logs: [],
    },
    {
      receipt_id: 'C6dvA1tpPKy3z2kzQHyphTZjCcgF9BxfTw9QUDchnjp4',
      predecessor_account_id: 'system',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: '9UCEs6dHKF6MKTYMktea6yQSaJ919Jc8WXdLSdgEPEbA',
      included_in_block_hash: '7W4SFg8JX6fsSZwViTh2562KHMiSzPRMN3xyZDFfiu8v',
      block_timestamp: '1669198653221412695',
      block: {
        block_height: 105857388,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 1e24,
      },
      outcomes: {
        status: false,
      },
      outcomes_agg: {
        transaction_fee: 44636512500000000000,
      },
      logs: [],
    },
    {
      receipt_id: 'FydcWZcRmSe531bQLg8q9XjZDZhnjbcLRGhSU1w3vLfi',
      predecessor_account_id: 'system',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: '3xyxw4LwUpP5qrBcULUm45F4V27iTbL6aNaEDU3Xe4qk',
      included_in_block_hash: '5dGSMARjsnzojR3qt4KfeRA9VQhfcPBkxVMeDbNtowot',
      block_timestamp: '1669198640441804939',
      block: {
        block_height: 105857375,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 1e24,
      },
      outcomes: {
        status: false,
      },
      outcomes_agg: {
        transaction_fee: 44636512500000000000,
      },
      logs: [],
    },
    {
      receipt_id: '4eask2Mv2o237BZA5C7VweLypaaKkA23PVxfdByKhfeN',
      predecessor_account_id: 'system',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: '3xyxw4LwUpP5qrBcULUm45F4V27iTbL6aNaEDU3Xe4qk',
      included_in_block_hash: '5dGSMARjsnzojR3qt4KfeRA9VQhfcPBkxVMeDbNtowot',
      block_timestamp: '1669198640441804939',
      block: {
        block_height: 105857375,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 1e24,
      },
      outcomes: {
        status: false,
      },
      outcomes_agg: {
        transaction_fee: 44636512500000000000,
      },
      logs: [],
    },
    {
      receipt_id: '5q1MZKcYbwJ2aoz3zuTgdTfAap3cdJ5Vo684KUX4pZCT',
      predecessor_account_id: 'apegov.testnet',
      receiver_account_id: '777',
      transaction_hash: '3xyxw4LwUpP5qrBcULUm45F4V27iTbL6aNaEDU3Xe4qk',
      included_in_block_hash: '5dGSMARjsnzojR3qt4KfeRA9VQhfcPBkxVMeDbNtowot',
      block_timestamp: '1669198640441804939',
      block: {
        block_height: 105857375,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 1e24,
      },
      outcomes: {
        status: false,
      },
      outcomes_agg: {
        transaction_fee: 44636512500000000000,
      },
      logs: [],
    },
    {
      receipt_id: '6d8RXCoh447CjD7g1eHQ26a1Tg6wFz9gFcCYymFnovGF',
      predecessor_account_id: 'apegov.testnet',
      receiver_account_id: '777',
      transaction_hash: 'Eq4BZUokTcyG1wnnM6Zdd6rkz3euF32jJ9F91bPa6Vde',
      included_in_block_hash: 'FEBeVknXNXa7zhoxoYyhvNk3miWPyYNjRb56dVLdWxBc',
      block_timestamp: '1669198627577012006',
      block: {
        block_height: 105857361,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 1e24,
      },
      outcomes: {
        status: false,
      },
      outcomes_agg: {
        transaction_fee: 44636512500000000000,
      },
      logs: [],
    },
    {
      receipt_id: 'D3yKPTU5GnsWTtSyURK3F2GKqmTbg3oGMeT5wdXzLkR8',
      predecessor_account_id: 'system',
      receiver_account_id: 'apegov.testnet',
      transaction_hash: 'Eq4BZUokTcyG1wnnM6Zdd6rkz3euF32jJ9F91bPa6Vde',
      included_in_block_hash: 'FEBeVknXNXa7zhoxoYyhvNk3miWPyYNjRb56dVLdWxBc',
      block_timestamp: '1669198627577012006',
      block: {
        block_height: 105857361,
      },
      actions: [
        {
          action: 'TRANSFER',
          method: null,
        },
      ],
      actions_agg: {
        deposit: 1e24,
      },
      outcomes: {
        status: false,
      },
      outcomes_agg: {
        transaction_fee: 44636512500000000000,
      },
      logs: [],
    },
  ],
}

