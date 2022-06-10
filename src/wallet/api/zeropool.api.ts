import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'
import bip39 from 'bip39-light'
import HDWalletProvider from '@truffle/hdwallet-provider'
// @ts-ignore
import wasmPath from 'libzeropool-rs-wasm-web/libzeropool_rs_wasm_bg.wasm'
// @ts-ignore
import workerPath from 'zeropool-client-js/lib/worker.js?asset'

import transferParamsUrl from 'assets/transfer_params.bin'
import treeParamsUrl from 'assets/tree_params.bin'
import transferVkUrl from 'assets/transfer_verification_key.json'
import treeVkUrl from 'assets/tree_verification_key.json'


import { EthereumClient, PolkadotClient, Client as NetworkClient } from 'zeropool-support-js'
import { init as initZPClient, ZeropoolClient } from 'zeropool-client-js'
import { deriveSpendingKey } from 'zeropool-client-js/lib/utils'
import { NetworkType } from 'zeropool-client-js/lib/network-type'
import { EvmNetwork } from 'zeropool-client-js/lib/networks/evm'
import { PolkadotNetwork } from 'zeropool-client-js/lib/networks/polkadot'

import { isEvmBased, isSubstrateBased } from 'wallet/api/networks'

export let client: NetworkClient
export let zpClient: ZeropoolClient
export let account: string

export const NETWORK = process.env.NETWORK || 'ethereum'
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0xC40Dd5B1250F4A7E70E1823d1D8eAbEA247cB1B3'
export const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS || '0xcda2B3489aCDB31A428bd33fcAEE5c7c50919b35'
export const RELAYER_URL = process.env.RELAYER_URL || 'https://kovan.testnet.relayer.v2.zeropool.network/'
export const RPC_URL = process.env.RPC_URL || 'https://kovan.poa.network/'
export const TRANSACTION_URL = process.env.TRANSACTION_URL || 'http://localhost:8545'
// tslint:disable: prettier

export const accountPresent = (): boolean => {
  return !!localStorage.getItem(`zp.${account}.seed`)
}

export const init = async (mnemonic: string, password: string): Promise<void> => {
  console.log('------------------------------------------------------')
  console.log('wasmPath: ', wasmPath)
  console.log('workerPath: ', workerPath)
  console.log('transferParamsUrl: ', transferParamsUrl)
  console.log('treeParamsUrl: ', treeParamsUrl)
  console.log('transferVkUrl: ', transferVkUrl)
  console.log('treeVkUrl: ', treeVkUrl)
  console.log('NETWORK: ', NETWORK)
  console.log('CONTRACT_ADDRESS: ', CONTRACT_ADDRESS)
  console.log('TOKEN_ADDRESS: ', TOKEN_ADDRESS)
  console.log('RELAYER_URL: ', RELAYER_URL)
  console.log('RPC_URL: ', RPC_URL)
  console.log('------------------------------------------------------')

  let network
  let worker
  let snarkParams
  const snarkParamsConfig = {
      transferParamsUrl,
      treeParamsUrl,
      transferVkUrl,
      treeVkUrl,
  }
  
  try {
    const initialized =
      await initZPClient(wasmPath, workerPath, snarkParamsConfig as any)
    worker = initialized.worker
    snarkParams = initialized.snarkParams
  } catch (e: any) {
      console.error(e);
      return Promise.reject(`Can't init ZeropoolClient: ${e.message}`)
  }

  if (isEvmBased(NETWORK)) {
    const provider = new HDWalletProvider({
        mnemonic,
        providerOrUrl: RPC_URL,
    })

    client = new EthereumClient(provider, { transactionUrl: TRANSACTION_URL })
    network = new EvmNetwork(RPC_URL)
  } else if (isSubstrateBased(NETWORK)) {
    network = new PolkadotNetwork();
    client = await PolkadotClient.create(
      mnemonic, 
      { rpcUrl: RPC_URL, transactionUrl: TRANSACTION_URL },
    )
  } else {
    throw new Error(`Unknown network ${NETWORK}`)
  }

  const networkType = NETWORK as NetworkType
  const sk = deriveSpendingKey(mnemonic, networkType)
  
  zpClient = await ZeropoolClient.create({
    sk,
    worker,
    snarkParams,
    tokens: {
        [TOKEN_ADDRESS]: {
            poolAddress: CONTRACT_ADDRESS,
            relayerUrl: RELAYER_URL,
        }
    },
    networkName: NETWORK,
    network,
  })

  localStorage.setItem(
    `zp.${account}.seed`,
    await AES.encrypt(mnemonic, password).toString()
  )
}

export const mint = async (amount: string): Promise<void> => {
  try {
    apiCheck()
  } catch (e: any) {
    return Promise.reject(e.message)
  }

  return await client.mint(TOKEN_ADDRESS, amount)
}

export const getSeed = (password: string): string => {
  let seed
  const cipherText = localStorage.getItem(`zp.${account}.seed`)

  if (!cipherText) throw new Error('Can not find seed!')

  try {
    seed = AES.decrypt(cipherText, password).toString(Utf8)
    if (!bip39.validateMnemonic(seed)) throw new Error('invalid mnemonic')
  } catch (_) {
    throw new Error('Incorrect password')
  }

  return seed
}

export const getRegularAddress = async (): Promise<string> => {
  try {
    apiCheck()
  } catch (e: any) {
    return Promise.reject(e.message)
  }

  return await client.getAddress()
}

export const getShieldedAddress = (): Promise<string> => {
  try {
    apiCheck()
  } catch (e: any) {
    return Promise.reject(e.message)
  }

  return Promise.resolve(zpClient.generateAddress(TOKEN_ADDRESS))
}

export const getTokenBalance = async (): Promise<string> => {
  try {
    apiCheck()
  } catch (e: any) {
    return Promise.reject(e.message)
  }

  return await client.getTokenBalance(TOKEN_ADDRESS)
}

export const getRegularBalance = async (): Promise<[string, string]> => {
  try {
    apiCheck()
  } catch (e: any) {
    return Promise.reject(e.message)
  }

  const balance = await client.getBalance()
  const readable = client.fromBaseUnit(balance)

  return [balance, readable]
}

export const getShieldedBalances = async (): Promise<[string, string, string]> => {
  try {
    apiCheck()
  } catch (e: any) {
    return Promise.reject(e.message)
  }

  const balances = zpClient.getBalances(TOKEN_ADDRESS)

  return balances
}

export const depositShielded = async (amount: string): Promise<string> => {
  let fromAddress = null
  let jobId = null

  if (isSubstrateBased(NETWORK)) fromAddress = await client.getPublicKey()
  else if (isEvmBased(NETWORK)) {
    console.log(
      'Approving allowance the Pool (%s) to spend our tokens (%s)',
      CONTRACT_ADDRESS,
      amount,
    )
    await client.approve(TOKEN_ADDRESS, CONTRACT_ADDRESS, amount)
  }

  console.log('Making deposit...')
  jobId = await zpClient.deposit(TOKEN_ADDRESS, amount, (data) => client.sign(data), fromAddress)
  console.log('Please wait relayer complete the job %s...', jobId)

  return await zpClient.waitJobCompleted(TOKEN_ADDRESS, jobId)
}

export const withdrawShielded = async (amount: string): Promise<string> => {
  apiCheck()

  let address = null

  if (isEvmBased(NETWORK)) address = await client.getAddress()
  else if (isSubstrateBased(NETWORK)) address = await client.getPublicKey()

  if (!address) throw new Error('No address found for withdrawal')

  console.log('Making withdraw...')

  const jobId = await zpClient.withdraw(TOKEN_ADDRESS, address, amount)

  console.log('Please wait relayer complete the job %s...', jobId)

  return await zpClient.waitJobCompleted(TOKEN_ADDRESS, jobId)
}

export const transfer = async (to: string, amount: string | number): Promise<void> => {
  apiCheck()

  console.log('Making private transfer...')

  await client.transfer(to, String(amount))
}

export const transferShielded = async (to: string, amount: string): Promise<string> => {
  apiCheck()

  console.log('Making private transfer...')

  const jobId = await zpClient.transfer(TOKEN_ADDRESS, [{ to, amount }])

  console.log('Please wait relayer complete the job %s...', jobId)

  return await zpClient.waitJobCompleted(TOKEN_ADDRESS, jobId)
}

export const addressShielded = (address: string, token: string): boolean => {
  return false
}

/*
const _getWalletBalance = (token: Token, walletId: string) => {
  // clientCheck()
  // const coin = hdWallet.getCoin(token.name as CoinType)
  // if (!coin) {
  //   throw Error(`Can not access ${token.name} data!`)
  // }
  // return from(coin.getBalances(1, walletId).catch(promiceErrorHandler<Balance[]>([]))).pipe(
  //   map((balances: any[]) => balances[0]),
  //   map((balance: any) => ({
  //     ...balance,
  //     balance: coin.fromBaseUnit(balance.balance),
  //   })),
  // )
}

const _getPrivateAddress = (token: Token) => {
  // if (!hdWallet) {
  //   throw Error('API not available!')
  // }
  // const coin = hdWallet.getCoin(token.name as CoinType)
  // if (!coin) {
  //   throw Error(`Can't estimate fee for ${token.symbol}`)
  // }
  // return from([coin.generatePrivateAddress()])
}

const _getAllBalances = (amount: number, offset = 0) => {
  // if (!hdWallet) {
  //   throw Error('API not available!')
  // }
  // return from(hdWallet.getBalances(amount, offset).catch(promiceErrorHandler({})))
}

const _getNetworkFee = (token: Token) => {
  // if (!hdWallet) {
  //   throw Error('API not available!')
  // }
  // const coin = hdWallet.getCoin(token.name as CoinType)
  // const e = `Can't estimate fee for ${token.name}`
  // if (!coin) {
  //   throw Error(`Can't estimate fee for ${token.symbol}`)
  // }
  // return from(coin.estimateTxFee().catch(promiceErrorHandler<{ fee: string }>({ fee: '' }, e)))
}

const _getWalletTransactions = (token: Token, walletId: number, mocked = false) => {
  // if (!hdWallet) {
  //   throw Error('API not available!')
  // }
  // const coin = hdWallet.getCoin(token.name as CoinType)
  // const e = `Can't get transactions for ${token.name}`
  // if (!coin) {
  //   throw Error(`Can't connect to ${token.symbol}`)
  // }
  // //#region TODO: Fix after implementing private transactions history
  // if (walletId === 0) {
  //   return of([])
  // }
  // walletId -= 1
  // //#endregion ---------------------------------------------------------
  // const tr =
  //   token.symbol === 'ETH'
  //     ? from(
  //         getEthTransactions(coin.getAddress(walletId), mocked).catch(
  //           promiceErrorHandler<Transaction[]>([], e),
  //         ),
  //       )
  //     : mocked
  //     ? of(mocks.transactions[token.symbol])
  //     : from(coin.getTransactions(walletId, 10, 0).catch(promiceErrorHandler<Transaction[]>([], e)))
  // return tr.pipe(map(convertValues(coin)))
}

const _transfer = (account: number, to: string, amount: number, token: Token) => {
  // if (!hdWallet) {
  //   throw Error('API not available!')
  // }
  // const coin = hdWallet.getCoin(token.name as CoinType)
  // const e = `Can't transfer ${token.name}`
  // if (!coin) {
  //   throw Error(`Can't estimate fee for ${token.symbol}`)
  // }
  // if (isPrivateAddress(to, token.symbol)) {
  //   if (isPrivateAddress(account.toString(), token.symbol)) {
  //     throw Error(`Not implemented.`)
  //     // return from(
  //     //   coin.updatePrivateState().then(() =>
  //     //     coin.withdrawPrivate(+to, amount.toString())
  //     //   )
  //     // )
  //   }
  //   return from(
  //     coin.updatePrivateState().then(() => {
  //       return coin.depositShielded(account, coin.toBaseUnit(amount.toString()))
  //     }),
  //   )
  // }
  // if (isPrivateAddress(account.toString(), token.symbol)) {
  //   throw Error(`Private local to public remote transactions are not implemented.`)
  // }
  // return from(coin.transfer(account, to, coin.toBaseUnit(amount.toString())))
}

const _isPrivateAddress = (address: string, token: TokenSymbol) => {
  // if (!hdWallet) {
  //   throw Error('API not available!')
  // }
  // return validateAddress(address)
}

// const _convertValues = (coin: Coin) => (transactions: Transaction[]) =>
//   transactions.map((transaction) => ({
//     ...transaction,
//     amount: coin.fromBaseUnit(transaction.amount),
//     timestamp: fixTimestamp(transaction.timestamp),
//   }))
*/

const networkInitialized = (): boolean => {
  return !!client
}

const zpInitialized = (): boolean => {
  return !!zpClient
}

const apiCheck = (): void => {
  if (!networkInitialized()) throw Error('Networt Client not available!')
  else if (!zpInitialized()) throw Error('ZP client not available!')
}
