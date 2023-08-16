import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'
import bip39 from 'bip39-light'
import HDWalletProvider from '@truffle/hdwallet-provider'

import transactionHelper, {
  PrivateHistorySourceRecord,
  PublicHistorySourceRecord,
} from 'wallet/state/helpers/transaction.helper'

import {
  catchError,
  concat,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  tap,
  throwError,
  withLatestFrom,
} from 'rxjs'

import {
  EthereumClient,
  PolkadotClient,
  NearClient,
  Client as SupportClient,
} from 'zeropool-support-js'

import {
  HistoryTransactionType,
  init as initZPClient,
  ZeropoolClient,
} from 'zeropool-client-js'
import { deriveSpendingKey } from 'zeropool-client-js/lib/utils'
import { PolkadotNetwork } from 'zeropool-client-js/lib/networks/polkadot'
import { NetworkType } from 'zeropool-client-js/lib/network-type'
import { EvmNetwork } from 'zeropool-client-js/lib/networks/evm'
import { NearNetwork } from 'zeropool-client-js/lib/networks/near'

import { apiErrorHandler } from 'wallet/api/error.handlers'
import { isEvmBased, isSubstrateBased } from 'wallet/api/networks'

import {
  PublicTransactionSource,
  transaction,
  Transaction,
} from 'shared/models/transaction'
import { TransferData } from 'shared/models'

import workersManifest from 'manifest.json'
import { getAllHistory } from 'wallet/api/nearblocks.api'
export { HistoryTransactionType } from 'zeropool-client-js'

// #region Initialization
export let zpSupport: SupportClient
export let zpClient: ZeropoolClient
export let account: string

export let NETWORK: string
export let NETWORK_NAME: string
export let NETWORK_FAUCET: string
export let CONTRACT_ADDRESS: string
export let TOKEN_ADDRESS: string
export let RELAYER_URL: string
export let RPC_URL: string
export let TRANSACTION_URL: string

if (process.env.NODE_ENV === 'development') {
  NETWORK = process.env.REACT_APP_NETWORK as string
  CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS as string
  NETWORK_NAME = process.env.REACT_APP_NETWORK_NAME as string
  NETWORK_FAUCET = process.env.REACT_APP_NETWORK_FAUCET as string
  TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS as string
  RELAYER_URL = process.env.REACT_APP_RELAYER_URL as string
  RPC_URL = process.env.REACT_APP_RPC_URL as string
  TRANSACTION_URL = process.env.REACT_APP_TRANSACTION_URL as string
} else if (process.env.NODE_ENV === 'production') {
  NETWORK = REACT_APP_NETWORK
  CONTRACT_ADDRESS = REACT_APP_CONTRACT_ADDRESS
  NETWORK_NAME = REACT_APP_NETWORK_NAME
  NETWORK_FAUCET = REACT_APP_NETWORK_FAUCET
  TOKEN_ADDRESS = REACT_APP_TOKEN_ADDRESS
  RELAYER_URL = REACT_APP_RELAYER_URL
  RPC_URL = REACT_APP_RPC_URL
  TRANSACTION_URL = REACT_APP_TRANSACTION_URL
}
// #endregion
// tslint:disable: prettier

export const accountPresent = (): boolean => {
  return !!localStorage.getItem(`zp.${account}.seed`)
}

export const init = async (
  mnemonic: string,
  password: string,
  accountId = '',
): Promise<void> => {
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
    transferVkUrl: '/assets/transfer_verification_key.json',
  }

  try {
    const initialized = await initZPClient(snarkParamsConfig as any, {
      workerSt: workersManifest['workerSt.js'],
      workerMt: workersManifest['workerMt.js'],
      wasmSt: workersManifest['libzeropool_rs_wasm_bg.wasm'],
      wasmMt: workersManifest['libzeropool_rs_wasm_mt_bg.wasm'],
    })

    worker = initialized.worker
    snarkParams = initialized.snarkParams
  } catch (e: any) {
    console.error(e)
    if (e.message === 'Unexpected length of input') {
      e.message = `probably you didn't copy static files. Pls copy them and clear all applicaton data using browser DevTools.`
    }

    return Promise.reject(`Can't init ZeropoolClient: ${apiErrorHandler(e.message)}`)
  }

  try {
    if (isEvmBased(NETWORK)) {
      const provider: any = new HDWalletProvider({
        mnemonic,
        providerOrUrl: RPC_URL,
      })

      zpSupport = new EthereumClient(provider, { transactionUrl: TRANSACTION_URL })
      network = new EvmNetwork(RPC_URL)
    } else if (isSubstrateBased(NETWORK)) {
      network = new PolkadotNetwork()
      zpSupport = await PolkadotClient.create(mnemonic, {
        rpcUrl: RPC_URL,
        transactionUrl: TRANSACTION_URL,
      })
    } else if (NETWORK === 'near') {
      network = new NearNetwork(
        RELAYER_URL,
        RPC_URL,
        CONTRACT_ADDRESS,
        10, // TODO: Make it configurable (requestsPerSecond)
      )

      zpSupport = await NearClient.create(
        {
          networkId: 'testnet', // TODO: Make it configurable
          nodeUrl: RPC_URL,
          walletUrl: 'https://wallet.testnet.near.org',
          helperUrl: 'https://helper.testnet.near.org',
        },
        CONTRACT_ADDRESS,
        mnemonic,
        accountId,
      )

      const address = await zpSupport.getAddress()
      localStorage.setItem('zp.production.accountId', address)
      sessionStorage.setItem('zp.development.password', address)
    } else {
      throw new Error(`Unknown network ${NETWORK}`)
    }
  } catch (e: any) {
    console.error(e)

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
      },
    },
    networkName: NETWORK_NAME.toLowerCase(),
    network,
  })

  localStorage.setItem(
    `zp.production.seed`,
    await AES.encrypt(mnemonic, password).toString(),
  )

  if (process.env.NODE_ENV === 'development') {
    sessionStorage.setItem('zp.development.seed', mnemonic)
    sessionStorage.setItem('zp.development.password', password)
  }
}

export const mint = async (tokens: string): Promise<void> => {
  try {
    apiCheck()
    const amount = await zpSupport.toBaseUnit(tokens)

    return await zpSupport.mint(TOKEN_ADDRESS, amount)
  } catch (err: unknown) {
    console.error((err as Error).message)

    return Promise.reject((err as Error).message || 'Unknown error')
  }
}
export const getDevSeed = (): string => {
  return sessionStorage.getItem('zp.development.seed') as string
}
export const getDevPassword = (): string => {
  return sessionStorage.getItem('zp.development.password') as string
}
export const getDevAccountId = (): string => {
  return sessionStorage.getItem('zp.development.accountId') as string
}
export const getAccountId = (): string => {
  return localStorage.getItem('zp.production.accountId') as string
}
export const getSeed = (password: string): Promise<string> => {
  let seed
  const cipherText = localStorage.getItem(`zp.production.seed`)

  if (!cipherText) return Promise.reject('Can not find seed!')

  try {
    seed = AES.decrypt(cipherText, password).toString(Utf8)
    if (!bip39.validateMnemonic(seed)) return Promise.reject('Incorect password!')

    return Promise.resolve(seed)
  } catch (e) {
    console.error(e)

    return Promise.reject('Incorrect password')
  }
}
export const getRegularAddress = async (): Promise<string> => {
  try {
    apiCheck()

    return await zpSupport.getAddress()
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

    const address = await zpSupport.getAddress()
    const tokenBalance = BigInt(await zpSupport.getTokenBalance(TOKEN_ADDRESS))
    const pendingDelta = await zpClient.getOptimisticTokenBalanceDelta(
      TOKEN_ADDRESS,
      address,
    )
    const pendingDeltaBn = BigInt(pendingDelta.toString())

    return zpSupport.fromBaseUnit((tokenBalance + pendingDeltaBn).toString())
  } catch (e: any) {
    console.error(e)

    return Promise.reject(String(e.message))
  }
}
export const getRegularBalance = async (): Promise<string> => {
  try {
    apiCheck()

    return zpSupport.fromBaseUnit(await zpSupport.getBalance())
  } catch (e: any) {
    console.error(e)

    return Promise.reject(String(e.message))
  }
}
export const getShieldedBalances = async (): Promise<string> => {
  try {
    apiCheck()

    return zpSupport.fromBaseUnit(
      (await zpClient.getOptimisticTotalBalance(TOKEN_ADDRESS)).toString(),
    )
  } catch (e: any) {
    console.error(e)

    return Promise.reject(String(e.message))
  }
}

export const deposit = (tokens: string): Observable<Transaction> => {
  const tr = transaction('deposit', 'started')
  const tr$ = new Subject<Transaction>()
  const sub = apiCheck$()
    .pipe(
      switchMap(() => from(zpSupport.toBaseUnit(tokens))),
      switchMap((amount) =>
        from(approve(amount)).pipe(
          tap(() => tr$.next(tr)),
          withLatestFrom(from(zpSupport.getAddress())),
          switchMap(([depositId, address]) =>
            from(
              zpClient.deposit(
                TOKEN_ADDRESS,
                BigInt(amount),
                (data: any) => zpSupport.sign(data),
                address,
                BigInt(0),
                [],
                depositId,
              ),
            ).pipe(
              tap((jobId: any) => tr$.next({ ...tr, status: 'pending', jobId })),
              switchMap((jobId) =>
                from(zpClient.waitJobCompleted(TOKEN_ADDRESS, jobId)).pipe(
                  tap(() => tr$.next({ ...tr, status: 'success', jobId })),
                  tap(() => {
                    tr$.complete()
                    sub.unsubscribe()
                  }),
                ),
              ),
            ),
          ),
        ),
      ),
      catchError((e) => {
        console.error(e)
        tr$.next({ ...tr, status: 'failed', error: e.message || e })
        sub.unsubscribe()

        return of(false)
      }),
    )
    .pipe(take(1))
    .subscribe()

  return tr$.pipe(
    tap((tr) => {
      console.log(`---> Transaction status: ${tr.status}`)
    }),
  )
}
export const withdraw = (tokens: string): Observable<Transaction> => {
  const tr: Transaction = transaction('withdraw', 'started')
  const tr$ = new Subject<Transaction>()

  const sub = apiCheck$()
    .pipe(
      switchMap(() => from(zpSupport.toBaseUnit(tokens))),
      switchMap((amount) =>
        from(getAddress()).pipe(
          tap(() => tr$.next(tr)),
          switchMap((address) =>
            from(zpClient.withdraw(TOKEN_ADDRESS, address, BigInt(amount))).pipe(
              tap((jobId: any) => tr$.next({ ...tr, status: 'pending', jobId })),
              switchMap((jobId) =>
                from(zpClient.waitJobCompleted(TOKEN_ADDRESS, jobId)).pipe(
                  tap(() => tr$.next({ ...tr, status: 'success', jobId })),
                  tap(() => {
                    tr$.complete()
                    sub.unsubscribe()
                  }),
                ),
              ),
            ),
          ),
        ),
      ),
      catchError((e) => {
        console.error(e)
        tr$.next({ ...tr, status: 'failed', error: e.message })
        sub.unsubscribe()

        return of(false)
      }),
    )
    .pipe(take(1))
    .subscribe()

  return tr$.pipe(
    tap((tr) => {
      console.log(`---> Transaction status: ${tr.status}`)
    }),
  )
}
export const transfer = (data: TransferData): Observable<Transaction> => {
  switch (data.type) {
    case 'funds':
      return transferFunds(data.to, data.amount)
    case 'publicToPublic':
      return transferPublicToPublic(data.to, data.amount)
    case 'publicToPrivate':
      return transferPublicToPrivate(data.to, data.amount)
    case 'privateToPublic':
      return transferPrivateToPublic(data.to, data.amount)
    case 'privateToPrivateOut':
      return transferPrivateToPrivate(data.to, data.amount)
    default:
      return from(
        Promise.reject(String(`Transfer ${data.type} turned off at the moment`)),
      )
  }
}

export const transferFunds = (to: string, funds: string): Observable<Transaction> => {
  const type = 'funds'

  return apiCheck$().pipe(
    switchMap(() => from(zpSupport.toBaseUnit(funds))),
    switchMap((tokens) =>
      concat(
        of(transaction(type, 'started')),
        from(zpSupport.transfer(to, tokens)).pipe(
          map(() => transaction(type, 'pending')),
          catchError((e) => {
            throw Error(apiErrorHandler(e.message))
          }),
        ),
        of(transaction(type, 'success')),
      ),
    ),
    catchError((e) => {
      console.error(e)

      return of({ type, status: 'failed', error: e.message } as Transaction)
    }),
  )
}
export const transferPublicToPublic = (
  to: string,
  tokens: string,
): Observable<Transaction> => {
  const type = 'publicToPublic'

  return apiCheck$().pipe(
    switchMap(() => from(zpSupport.toBaseUnit(tokens))),
    switchMap((amount) =>
      concat(
        of(transaction(type, 'started')),
        from(zpSupport.transferToken(TOKEN_ADDRESS, to, amount)).pipe(
          map(() => transaction(type, 'pending')),
          catchError((e) => {
            throw Error(apiErrorHandler(e.message))
          }),
        ),
        of(transaction(type, 'success')),
      ),
    ),
    catchError((e) => {
      console.error(e)

      return of({ type, status: 'failed', error: e.message } as Transaction)
    }),
  )
}
export const transferPublicToPrivate = (
  to: string,
  tokens: string,
): Observable<Transaction> => {
  const tr: Transaction = transaction('publicToPrivate', 'started')
  const tr$ = new Subject<Transaction>()
  const sub = apiCheck$()
    .pipe(
      switchMap(() => from(zpSupport.toBaseUnit(tokens))),
      switchMap((amount) =>
        from(approve(amount)).pipe(
          // tap(() => tr$.next(tr)),
          withLatestFrom(from(zpSupport.getAddress())),
          switchMap(([depositId, address]) =>
            from(
              zpClient.deposit(
                TOKEN_ADDRESS,
                BigInt(amount),
                (data: any) => zpSupport.sign(data),
                address,
                BigInt(0),
                [{ to, amount }],
                depositId,
              ),
            ).pipe(
              tap((jobId: any) => tr$.next({ ...tr, status: 'pending', jobId })),
              switchMap((jobId) =>
                from(zpClient.waitJobCompleted(TOKEN_ADDRESS, jobId)).pipe(
                  tap(() => tr$.next({ ...tr, status: 'success', jobId })),
                  tap(() => {
                    tr$.complete()
                    sub.unsubscribe()
                  }),
                ),
              ),
            ),
          ),
        ),
      ),
      catchError((e) => {
        console.error(e)
        tr$.next({ ...tr, status: 'failed', error: e.message })
        sub.unsubscribe()

        return of(false)
      }),
    )
    .pipe(take(1))
    .subscribe()

  return tr$.pipe(
    tap((tr) => {
      console.log(`---> Transaction status: ${tr.status}`)
    }),
  )
}
export const transferPrivateToPublic = (
  to: string,
  tokens: string,
): Observable<Transaction> => {
  const tr: Transaction = transaction('privateToPublic', 'started')
  const tr$ = new Subject<Transaction>()

  const sub = apiCheck$()
    .pipe(
      // tap(() => tr$.next(tr)),
      switchMap(() => from(zpSupport.toBaseUnit(tokens))),
      switchMap((amount) =>
        from(zpClient.withdraw(TOKEN_ADDRESS, to, BigInt(amount))).pipe(
          tap((jobId: any) => tr$.next({ ...tr, status: 'pending', jobId })),
          switchMap((jobId) =>
            from(zpClient.waitJobCompleted(TOKEN_ADDRESS, jobId)).pipe(
              tap(() => tr$.next({ ...tr, status: 'success', jobId })),
              tap(() => {
                tr$.complete()
                sub.unsubscribe()
              }),
            ),
          ),
        ),
      ),
      catchError((e) => {
        console.error(e)
        tr$.next({ ...tr, status: 'failed', error: e.message })
        sub.unsubscribe()

        return of(false)
      }),
    )
    .pipe(take(1))
    .subscribe()

  return tr$.pipe(
    tap((tr) => {
      console.log(`---> Transaction status: ${tr.status}`)
    }),
  )
}
export const transferPrivateToPrivate = (
  to: string,
  tokens: string,
): Observable<Transaction> => {
  const tr: Transaction = transaction('privateToPrivateOut', 'started')
  const tr$ = new Subject<Transaction>()

  const sub = apiCheck$()
    .pipe(
      switchMap(() => from(zpSupport.toBaseUnit(tokens))),
      switchMap((amount) => {
        tr$.next(tr) //TODO: NOT WORKING!

        return from(zpClient.transfer(TOKEN_ADDRESS, [{ to, amount }])).pipe(
          tap((jobId: any) => tr$.next({ ...tr, status: 'pending', jobId })),
          switchMap((jobId) =>
            from(zpClient.waitJobCompleted(TOKEN_ADDRESS, jobId)).pipe(
              tap(() => tr$.next({ ...tr, status: 'success', jobId })),
              tap(() => {
                tr$.complete()
                sub.unsubscribe()
              }),
            ),
          ),
        )
      }),
      catchError((e) => {
        console.error(e)
        tr$.next({ ...tr, status: 'failed', error: e.message })
        sub.unsubscribe()

        return of(false)
      }),
    )
    .pipe(take(1))
    .subscribe()

  return tr$.pipe(
    tap((tr) => {
      console.log(`---> Transaction status: ${tr.status}`)
    }),
  )
}

export const addressShielded = (address: string, token: string): boolean => {
  return false
}

export const approve = async (amount: string): Promise<number | null> => {
  console.log(
    'Approving allowance the Pool (%s) to spend our tokens (%s)',
    CONTRACT_ADDRESS,
    amount,
  )

  return await zpSupport.approve(TOKEN_ADDRESS, CONTRACT_ADDRESS, amount)
}

export const getAddress = async (): Promise<string> => {
  let address = await zpSupport.getAddress()

  return address || Promise.reject(`No address found for withdrawal`)
}

export const getPrivateHistory = (): Observable<Transaction[]> => {
  const data: Promise<PrivateHistorySourceRecord[]> = zpClient
    .getState(TOKEN_ADDRESS)
    .history.getAllHistory()

  const normalizedData = from(data).pipe(
    tap((records) => {
      console.log('private history', records)
    }),
    map((i) => i.map((r) => (r.type === 3 ? r : { ...r, from: 'Private' }))),
    mergeMap((records) =>
      forkJoin(
        records.map((record) =>
          from(
            transactionHelper.fromPrivateHistory(
              record,
              zpSupport.fromBaseUnit.bind(zpSupport),
              BigInt(zpClient.getDenominator(TOKEN_ADDRESS).toString()),
            ),
          ),
        ),
      ),
    ),
    catchError((e) => {
      console.error(e)
      return throwError(() => new Error('Error getting private history'))
    }),
  )

  return normalizedData
}
export const getPublicHistory = (): Observable<Transaction[]> => {
  const data: Promise<PublicTransactionSource[]> =
    TOKEN_ADDRESS === 'near'
      ? getAllHistory(TOKEN_ADDRESS)
      : zpSupport.getAllHistory(TOKEN_ADDRESS)

  const normalizedData = from(data).pipe(
    tap((records) => {
      console.log('public history', records)
    }),
    mergeMap((records) =>
      forkJoin(
        records
          // Filter out withdrawals and deposits from public history
          .filter((r) => r.from?.toUpperCase() !== CONTRACT_ADDRESS.toUpperCase())
          .filter((r) => r.to?.toUpperCase() !== CONTRACT_ADDRESS.toUpperCase())
          .map((record) =>
            from(
              transactionHelper.fromPublicHistory(
                record as any,
                zpSupport.fromBaseUnit.bind(zpSupport),
                CONTRACT_ADDRESS,
              ),
            ),
          ),
      ),
    ),
    catchError((e) => {
      console.error(e)
      return throwError(() => new Error('Error getting public history'))
    }),
  )

  return normalizedData
}

export const apiCheck = (): boolean => {
  if (!zpSupport) throw Error('Networt Client not available!')
  else if (!zpClient) throw Error('ZP client not available!')

  return true
}

const apiCheck$ = (): Observable<boolean> => of(apiCheck())
