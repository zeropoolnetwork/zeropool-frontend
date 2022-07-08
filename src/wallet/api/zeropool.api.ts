import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'
import bip39 from 'bip39-light'
import HDWalletProvider from '@truffle/hdwallet-provider'
import { EthereumClient, PolkadotClient, Client as NetworkClient } from 'zeropool-support-js'
import { init as initZPClient, ZeropoolClient } from 'zeropool-client-js'
import { deriveSpendingKey } from 'zeropool-client-js/lib/utils'
import { NetworkType } from 'zeropool-client-js/lib/network-type'
import { EvmNetwork } from 'zeropool-client-js/lib/networks/evm'
import { PolkadotNetwork } from 'zeropool-client-js/lib/networks/polkadot'

import { isEvmBased, isSubstrateBased } from 'wallet/api/networks'
import { TransferData } from 'shared/models'

export let client: NetworkClient
export let zpClient: ZeropoolClient
export let account: string

export let NETWORK: string
export let CONTRACT_ADDRESS: string
export let TOKEN_ADDRESS: string
export let RELAYER_URL: string
export let RPC_URL: string
export let TRANSACTION_URL: string

if (process.env.NODE_ENV === 'development') {
  NETWORK = process.env.REACT_APP_NETWORK as string
  CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS as string
  TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS as string
  RELAYER_URL = process.env.REACT_APP_RELAYER_URL as string
  RPC_URL = process.env.REACT_APP_RPC_URL as string
  TRANSACTION_URL = process.env.REACT_APP_TRANSACTION_URL as string
} else if (process.env.NODE_ENV === 'production') {
  NETWORK = REACT_APP_NETWORK
  CONTRACT_ADDRESS = REACT_APP_CONTRACT_ADDRESS
  TOKEN_ADDRESS = REACT_APP_TOKEN_ADDRESS
  RELAYER_URL = REACT_APP_RELAYER_URL
  RPC_URL = REACT_APP_RPC_URL
  TRANSACTION_URL = REACT_APP_TRANSACTION_URL
}

// tslint:disable: prettier

export const accountPresent = (): boolean => {
  return !!localStorage.getItem(`zp.${account}.seed`)
}

export const init = async (mnemonic: string, password: string): Promise<void> => {
  console.log('------------------------------------------------------')
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
    transferParamsUrl: '/assets/transfer_params.bin',
    treeParamsUrl: '/assets/tree_params.bin',
    transferVkUrl: '/assets/transfer_verification_key.json',
    treeVkUrl: '/assets/tree_verification_key.json',
  }

  try {
    const initialized =
      await initZPClient(snarkParamsConfig as any)

    worker = initialized.worker
    snarkParams = initialized.snarkParams
  } catch (e: any) {
    console.error(e);
    if (e.message === 'Unexpected length of input') {
      e.message = `probably you didn't copy static files. Pls copy them and clear all applicaton data using browser DevTools.`
    }

    return Promise.reject(`Can't init ZeropoolClient: ${e.message}`)
  }

  try {
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
  } catch (e: any) {
    return Promise.reject(e.message)
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
    `zp.production.seed`,
    await AES.encrypt(mnemonic, password).toString()
  )

  if (process.env.NODE_ENV === 'development') {
    sessionStorage.setItem('zp.development.seed', mnemonic)
    sessionStorage.setItem('zp.development.password', password)
  }
}

export const mint = async (tokens: string): Promise<void> => {
  try {
    apiCheck()
    const amount = client.toBaseUnit(tokens)

    return await client.mint(TOKEN_ADDRESS, amount)
  } catch (e: any) {
    console.error(e)

    return Promise.reject(e.message)
  }
}

export const getDevSeed = (): string => {
  return sessionStorage.getItem('zp.development.seed') as string
}

export const getDevPassword = (): string => {
  return sessionStorage.getItem('zp.development.password') as string
}

export const getSeed = (password: string): Promise<string> => {
  let seed
  const cipherText = localStorage.getItem(`zp.production.seed`)

  if (!cipherText) return Promise.reject('Can not find seed!')

  try {
    seed = AES.decrypt(cipherText, password).toString(Utf8)
    if (!bip39.validateMnemonic(seed)) return Promise.reject('Incorect password!')

    return Promise.resolve(seed)
  } catch (_) {
    return Promise.reject('Incorrect password')
  }
}

export const getRegularAddress = async (): Promise<string> => {
  try {
    apiCheck()

    return await client.getAddress()
  } catch (e: any) {
    console.error(e)

    return Promise.reject(String(e.message))
  }
}

export const getShieldedAddress = (): Promise<string> => {
  try {
    apiCheck()

    return Promise.resolve(zpClient.generateAddress(TOKEN_ADDRESS))
  } catch (e: any) {
    console.error(e)

    return Promise.reject(String(e.message))
  }
}

export const getTokenBalance = async (): Promise<string> => {
  try {
    apiCheck()
    return client.fromBaseUnit(await client.getTokenBalance(TOKEN_ADDRESS))
  } catch (e: any) {
    return Promise.reject(String(e.message))
  }
}

export const getRegularBalance = async (): Promise<string> => {
  try {
    apiCheck()

    return client.fromBaseUnit(await client.getBalance())
  } catch (e: any) {
    console.error(e)

    return Promise.reject(String(e.message))
  }
}

export const getShieldedBalances = async (): Promise<string> => {
  try {
    apiCheck()

    return client.fromBaseUnit((await zpClient.getBalances(TOKEN_ADDRESS))[0])
  } catch (e: any) {
    console.error(e)

    return Promise.reject(String(e.message))
  }
}

export const depositShielded = async (tokens: string): Promise<string> => {
  try {
    apiCheck()

    const amount = client.toBaseUnit(tokens)
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
    jobId = await zpClient.deposit(TOKEN_ADDRESS, amount, (data) => client.sign(data), fromAddress, '0', undefined, [])
    console.log('Please wait relayer complete the job %s...', jobId)

    return await zpClient.waitJobCompleted(TOKEN_ADDRESS, jobId)
  } catch (e: any) {
    return Promise.reject(String(e.message))

  }
}

export const withdrawShielded = async (tokens: string): Promise<string> => {
  try {
    apiCheck()

    const amount = client.toBaseUnit(tokens)
    let address = null

    if (isEvmBased(NETWORK)) address = await client.getAddress()
    else if (isSubstrateBased(NETWORK)) address = await client.getPublicKey()

    if (!address) throw new Error('No address found for withdrawal')

    console.log('Making withdraw...')

    const jobId = await zpClient.withdraw(TOKEN_ADDRESS, address, amount)

    console.log('Please wait relayer complete the job %s...', jobId)

    return await zpClient.waitJobCompleted(TOKEN_ADDRESS, jobId)
  } catch (e: any) {
    return Promise.reject(String(e.message))
  }
}

export const transfer = async (data: TransferData): Promise<string|void> => {
  switch (data.type) {
    case 'privateToPrivate':
      return transferPrivateToPrivate(data.to, data.amount)
    case 'funds':
      return transferFunds(data.to, data.amount)
    case 'publicToPublic':
      return transferTokens(data.to, data.amount)
    case 'publicToPrivate':
      return transferPublicToPrivate(data.to, data.amount)
    case 'privateToPublic':
      return transferPrivateToPublic(data.to, data.amount)
    default:
      return Promise.reject(String(`Transfer ${data.type} not implemented`));
  }
}

export const transferFunds = async (to: string, amount: string): Promise<void> => {
  try {
    apiCheck()

    return await client.transfer(to, String(client.toBaseUnit(amount)))
  } catch (e: any) {
    return Promise.reject(String(e.message))
  }
}

export const transferTokens = async (to: string, amount: string): Promise<void> => {
  try {
    apiCheck()

    return await client.transferToken(TOKEN_ADDRESS, to, String(client.toBaseUnit(amount)))
  } catch (e: any) {
    return Promise.reject(String(e.message))
  }
}

export const transferPublicToPrivate = async (to: string, tokens: string): Promise<string> => {
  try {
    apiCheck()

    const amount = client.toBaseUnit(tokens)
    let fromAddress = null

    if (isSubstrateBased(NETWORK)) fromAddress = await client.getPublicKey()
    else if (isEvmBased(NETWORK)) {
      console.log(
        'Approving allowance the Pool (%s) to spend our tokens (%s)',
        CONTRACT_ADDRESS,
        amount,
      )
      await client.approve(TOKEN_ADDRESS, CONTRACT_ADDRESS, amount)
    }

    return await zpClient.deposit(TOKEN_ADDRESS, String(client.toBaseUnit(amount)), (data) => client.sign(data), fromAddress, '0', undefined, [{to, amount}])
  } catch (e: any) {
    return Promise.reject(String(e.message))
  }
}

export const transferPrivateToPublic = async (to: string, tokens: string): Promise<string> => {
  try {
    apiCheck()

    const amount = client.toBaseUnit(tokens)

    const jobId = await zpClient.withdraw(TOKEN_ADDRESS, to, amount)

    return await zpClient.waitJobCompleted(TOKEN_ADDRESS, jobId)
  } catch (e: any) {
    return Promise.reject(String(e.message))
  }
}


export const transferPrivateToPrivate = async (to: string, tokens: string): Promise<string> => {
  try {
    apiCheck()

    const amount = client.toBaseUnit(tokens)
    const jobId = await zpClient.transfer(TOKEN_ADDRESS, [{ to, amount }])

    console.log('Please wait relayer complete the job %s...', jobId)

    return await zpClient.waitJobCompleted(TOKEN_ADDRESS, jobId)
  } catch (e: any) {
    return Promise.reject(String(e.message))
  }
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
