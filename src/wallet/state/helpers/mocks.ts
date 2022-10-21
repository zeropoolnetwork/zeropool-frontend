import { PublicHistorySourceRecord } from 'wallet/state/helpers/transaction.helper'

export const fundsIncomeMock: PublicHistorySourceRecord = {
  blockHash: '0x9c7998af4db24e13901968a9ba35b328282c89f69e679c06b76f2972745ed959',
  blockNumber: '7802460',
  confirmations: '1068',
  contractAddress: '',
  from: '0x631e9b031b16b18172a2b9d66c3668a68a668d20',
  functionName: '',
  gas: '42000',
  gasPrice: '23581100104',
  gasUsed: '21000',
  hash: '0x6e1460f4d31b0236cc675ee2088ef1f0c7820c1e7046b56aaea23b4923b980eb',
  input: '0x',
  isError: '0',
  methodId: '0x',
  nonce: '121157',
  timeStamp: '1666267596',
  to: '0xc2dd4ad652ad13656658244aebf152b0a725edf5',
  transactionIndex: '8',
  txreceipt_status: '1',
  value: '100000000000000000',
}

export const tokenIncomeMock: PublicHistorySourceRecord = {
  blockHash: '0x7bfffb5de5f9c8e88f92493eab0279e1c0ab3631c845f02ef2d9271266a3bef2',
  blockNumber: '7803493',
  confirmations: '35',
  contractAddress: '',
  from: '0xc2dd4ad652ad13656658244aebf152b0a725edf5',
  functionName: 'mint(address _to, uint256 _amount)',
  gas: '51472',
  gasPrice: '11018071960',
  gasUsed: '51472',
  hash: '0x60f0245fa4101ff78c5c5b632fd59c5cac2a66042f0899b6994696b0f8b47f4d',
  input:
    '0x40c10f19000000000000000000000000c2dd4ad652ad13656658244aebf152b0a725edf50000000000000000000000000000000000000000000000120d4da7b0bd140000',
  isError: '0',
  methodId: '0x40c10f19',
  nonce: '0',
  timeStamp: '1666283124',
  to: '0xcda2b3489acdb31a428bd33fcaee5c7c50919b35',
  transactionIndex: '75',
  txreceipt_status: '1',
  value: '0',
}

