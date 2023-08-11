// tslint:disable: prettier max-line-length
import {
  catchError,
  delay,
  filter,
  from,
  ignoreElements,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs'
import { combineEpics, Epic } from 'redux-observable'
import { PayloadAction } from '@reduxjs/toolkit'

import * as api from 'wallet/api/zeropool.api'
import { demoActions } from 'wallet/state/demo.reducer'
import { selectInitials } from 'wallet/state/demo.selectors'

import { RootState } from 'state'

import { toast } from 'shared/helpers/toast.helper'
import { isNonNull } from 'shared/operators/is-not-null'
import { callFaucet } from 'wallet/api/faucet.api'
import { Transaction } from 'shared/models/transaction'
// tslint:enable: prettier max-line-length

type Action$ = Observable<PayloadAction>
type State$ = Observable<RootState>

const initApi = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.initApi.match),
    withLatestFrom(state$.pipe(map(selectInitials))),
    map(([, initials]) => initials),
    filter((initials) => !!initials),
    tap(() => toast.close('initApiError')),
    tap(() =>
      toast.info(
        'Initializing, it can take up to 30 seconds, if more, try restart with F5 button. Do not open DevTools to prevent lags.',
        {
          key: 'initApi',
          persist: true,
        },
      ),
    ),
    switchMap((initials) =>
      from(
        api.init(
          (initials as any).seed,
          (initials as any).password,
          (initials as any).accountId || api.getAccountId(),
        ),
      ).pipe(
        map(() => demoActions.initApiSuccess(null)),
        tap(() => toast.close('initApi')),
        tap(() => toast.success('Wallet initialized')),
        catchError((errMsg: string) => {
          toast.close('initApi')
          toast.error(errMsg, { key: 'initApiError', persist: true })

          setTimeout(() => window.location.reload(), 10000)

          return of(demoActions.initApiFailure(errMsg))
        }),
      ),
    ),
  )
}
const mint: Epic = (action$, state$) => {
  return action$.pipe(
    filter(demoActions.mint.match),
    tap(({ payload }) =>
      toast.info(`Minting ${payload} tokens...`, { key: 'mint', persist: true }),
    ),
    switchMap(({ payload }) =>
      from(api.mint(payload)).pipe(
        tap(() => toast.close('mint')),
        tap(() => toast.success('Mint success')),
        map((res) => demoActions.mintSuccess(+payload)),
        catchError((errMsg: string) => {
          toast.close('mint')
          toast.error(errMsg)

          return of(demoActions.mintFailure(errMsg))
        }),
      ),
    ),
  )
}
const deposit: Epic = (action$, state$) => {
  return action$.pipe(
    filter(demoActions.deposit.match),
    switchMap(({ payload }) =>
      api.deposit(payload).pipe(
        mergeMap((transaction: Transaction) => {
          switch (transaction.status) {
            case 'started':
              toast.info(`Depositing ${payload} tokens...`, {
                key: 'deposit',
                persist: true,
              })

              return of(demoActions.transaction(transaction))

            case 'pending':
              toast.close('deposit')
              toast.success('Deposit success')

              return of(demoActions.transaction(transaction))

            case 'success':
              toast.success(`Deposit confirmed`, {
                key: transaction.jobId,
                persist: false,
              })

              return of(
                demoActions.transaction(transaction),
                demoActions.depositSuccess(payload),
              )

            default:
              throw transaction.error || 'Deposit failed'
          }
        }),
        catchError((errMsg: string) => {
          toast.close('deposit')
          toast.error(errMsg)

          return of(demoActions.depositFailure(errMsg))
        }),
      ),
    ),
  )
}
const withdraw: Epic = (action$, state$) => {
  return action$.pipe(
    filter(demoActions.withdraw.match),
    switchMap(({ payload }) =>
      api.withdraw(payload).pipe(
        switchMap((transaction: Transaction) => {
          switch (transaction.status) {
            case 'started':
              toast.info(`Withdrawing ${payload} tokens...`, {
                key: 'withdraw',
                persist: true,
              })

              return of(demoActions.transaction(transaction))

            case 'pending':
              toast.close('withdraw')
              toast.success('Withdraw success')

              return of(demoActions.transaction(transaction))

            case 'success':
              toast.success(`Withdraw confirmed`)

              return of(
                demoActions.transaction(transaction),
                demoActions.withdrawSuccess(payload),
              )
            default:
              throw transaction.error || 'Withdraw failed'
          }
        }),
        catchError((errMsg: string) => {
          toast.close('withdraw')
          toast.error(errMsg)

          return of(demoActions.withdrawFailure(errMsg))
        }),
      ),
    ),
  )
}
const transfer: Epic = (action$, state$) => {
  return action$.pipe(
    filter(demoActions.transfer.match),
    tap(({ payload }) =>
      toast.info(
        `Processing transfer of ${payload.amount} ${
          payload.type === 'funds' ? `funds` : `tokens`
        }...`,
        { key: 'transfer', persist: true },
      ),
    ),
    switchMap(({ payload }) =>
      api.transfer(payload).pipe(
        switchMap((transaction: Transaction) => {
          switch (transaction.status) {
            case 'started':
              return of(demoActions.transaction(transaction))

            case 'pending':
              toast.close('transfer')
              toast.success('Transfer success')

              return of(demoActions.transaction(transaction))

            case 'success':
              toast.success(`Transfer confirmed`)

              return of(
                demoActions.transaction(transaction),
                demoActions.transferSuccess(payload.type),
              )
            default:
              throw transaction.error || 'Transaction failed'
          }
        }),
        catchError((errMsg: string) => {
          toast.close('transfer')
          toast.error(errMsg)

          return of(demoActions.transferFailure(errMsg))
        }),
      ),
    ),
  )
}

const updateBalances: Epic = (action$, state$) => {
  return action$.pipe(
    filter(demoActions.updateBalances.match),
    switchMap(({ payload }) =>
      of(
        demoActions.getPublicBalance(payload?.funds || 0),
        demoActions.getPrivateBalance(payload?.private || 0),
        demoActions.getTokenBalance(payload?.tokens || 0),
      ),
    ),
  )
}

const getPublicBalance = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.getPublicBalance.match),
    switchMap(({ payload }) =>
      of(1).pipe(
        delay(payload),
        switchMap(() =>
          from(api.getRegularBalance()).pipe(
            map((balance) => demoActions.publicBalance(balance)),
            catchError((errMsg: string) => {
              toast.error(errMsg)

              return of(demoActions.updateBalancesFailure(errMsg))
            }),
          ),
        ),
      ),
    ),
  )
}
const getTokenBalance = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.getTokenBalance.match),
    switchMap(({ payload }) =>
      of(1).pipe(
        delay(payload),
        switchMap(() =>
          from(api.getTokenBalance()).pipe(
            map((balance) => demoActions.tokenBalance(balance)),
            catchError((errMsg: string) => {
              toast.error(errMsg)

              return of(demoActions.updateBalancesFailure(errMsg))
            }),
          ),
        ),
      ),
    ),
  )
}
const getPrivateBalance = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.getPrivateBalance.match),
    switchMap(({ payload }) =>
      of(1).pipe(
        delay(payload),
        switchMap(() =>
          from(api.getShieldedBalances()).pipe(
            map((balance) => demoActions.privateBalance(balance)),
            catchError((errMsg: string) => {
              toast.error(errMsg)

              return of(demoActions.updateBalancesFailure(errMsg))
            }),
          ),
        ),
      ),
    ),
  )
}

const getWalletAddress = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.getWalletAddress.match),
    mergeMap(() =>
      from(api.getRegularAddress()).pipe(
        map((address) => demoActions.getWalletAddressSuccess(address)),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.getWalletAddressFailure(errMsg))
        }),
      ),
    ),
  )
}
const getPrivateAddress = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.getPrivateAddress.match),
    mergeMap(() =>
      from(api.getShieldedAddress()).pipe(
        map((address) => demoActions.getPrivateAddressSuccess(address)),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.getPrivateAddressFailure(errMsg))
        }),
      ),
    ),
  )
}

const updateDataAfterInitialization = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.initApiSuccess.match),
    mergeMap(() =>
      of(
        demoActions.getWalletAddress(null),
        demoActions.getPrivateAddress(null),
        demoActions.updateBalances(null),
      ),
    ),
  )
}
const updateBalancesAfterMint = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.mintSuccess.match),
    map(() => demoActions.updateBalances(null)),
  )
}
// const updateBalancesAfterTransactionPending = (action$: Action$, state$: State$) => { return action$.pipe(
//   filter(demoActions.transaction.match),
//   filter((transaction) => 'pending' === transaction.payload.status),
//   map(() => demoActions.updateBalances({ funds: 0, tokens: 5000, private: 1000 })),
// )}
const updateBalancesAfterTransactionSuccess = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.transaction.match),
    filter(({ payload: tr }) => 'success' === tr.status),
    map(({ payload: tr }) =>
      demoActions.updateBalances({
        funds: 0,
        tokens: ['privateToPublic', 'privateToPrivate'].includes(tr.type) ? 0 : 4000,
        private: 1000,
      }),
    ),
  )
}

// const updateBalancesAfterTransfer = (action$: Action$, state$: State$) => { return action$.pipe(
//   filter(demoActions.transferSuccess.match),
//   map(() => demoActions.updateBalances({ funds: 0, tokens: 1000, private: 1000 })),
// )}

const exportSeed = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.exportSeed.match),
    mergeMap(({ payload }) =>
      from(api.getSeed(payload)).pipe(
        map((seed) => demoActions.exportSeedSuccess(seed)),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.exportSeedFailure(errMsg))
        }),
      ),
    ),
  )
}
const exportSeedSuccess = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.exportSeedSuccess.match),
    tap(({ payload }) => {
      navigator.clipboard.writeText(payload).then(
        () => {
          toast.success(`Seed copied to the clipboard`)
        },
        (err) => {
          toast.error(`Can't access clipboard`)
        },
      )
    }),
    ignoreElements(),
  )
}

const recowerWallet = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.recoverWallet.match),
    map(({ payload }) => payload),
    filter(isNonNull),
    mergeMap((password) =>
      from(api.getSeed(password)).pipe(
        map((seed) =>
          demoActions.recoverWalletSuccess({
            seed,
            password,
            accountId: api.getAccountId(),
          }),
        ),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.recoverWalletFailure(errMsg))
        }),
      ),
    ),
  )
}
const recoverWalletSuccess = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.recoverWalletSuccess.match),
    mergeMap(({ payload }) =>
      of(demoActions.setSeedAndPasword(payload), demoActions.initApi(null)),
    ),
  )
}

const resetAccount: Epic = (action$: Action$) => {
  return action$.pipe(
    filter(demoActions.resetAccount.match),
    tap(({ payload: hardReset }) => {
      sessionStorage.clear()
      localStorage.clear()

      if (hardReset) {
        caches.keys().then((keys) => {
          keys.forEach((key) => caches.delete(key))
        })
        indexedDB.databases().then((dbs) => {
          dbs.forEach((db) => indexedDB.deleteDatabase((db as any).name))
        })
      }
    }),
    tap((a) => toast.success('Wallet reseted')),
    ignoreElements(),
  )
}
const restoreSession = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.initApi.match),
    withLatestFrom(state$.pipe(map(selectInitials))),
    filter(([, initials]) => !initials),
    mergeMap(() => {
      let seed, password, accountId
      seed = api.getDevSeed()
      password = api.getDevPassword()
      accountId = api.getDevAccountId()
      if (seed && password) {
        return of(
          demoActions.setSeedAndPasword({ seed, password, accountId }),
          demoActions.initApi(null),
        )
      } else {
        return of(demoActions.recoverWallet(null))
      }
    }),
    catchError((errMsg: string) => {
      toast.error(errMsg)

      return of(demoActions.initApiFailure(errMsg))
    }),
  )
}
const resetOnError = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.initApiFailure.match),
    map(() => demoActions.resetAccount(false)),
  )
}

const callGetTransactionsOnTransactionsModalOpen = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.transactionsModal.match),
    filter((action) => action.payload),
    map(() => demoActions.getTransactions()),
  )
}

const getPublicHistory$ = of('').pipe(
  switchMap(() =>
    api.getPublicHistory().pipe(
      catchError((err: Error) => {
        toast.error(err.message)

        return of([])
      }),
    ),
  ),
  catchError((err: Error) => {
    toast.error(err.message)

    return of([])
  }),
)

const getPrivateHistory$ = of('').pipe(
  switchMap(() =>
    api.getPrivateHistory().pipe(
      catchError((err: Error) => {
        toast.error(err.message)

        return of([])
      }),
    ),
  ),
  catchError((err: Error) => {
    toast.error(err.message)

    return of([])
  }),
)

const getTransactions = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.getTransactions.match),
    mergeMap(() =>
      getPublicHistory$.pipe(
        switchMap((publicHistory: Transaction[]) =>
          getPrivateHistory$.pipe(
            map((privateHistory: Transaction[]) =>
              demoActions.getTransactionsSuccess(publicHistory.concat(privateHistory)),
            ),
          ),
        ),
        catchError((err: Error) => {
          toast.error(err.message)

          return of(demoActions.getTransactionsFailure(err.message || 'Unknown error'))
        }),
      ),
    ),
  )
}

const callFauset = (action$: Action$, state$: State$) => {
  return action$.pipe(
    filter(demoActions.faucetRequest.match),
    mergeMap(({ payload }) =>
      of(payload).pipe(
        switchMap(async ({ amount, address }) =>
          from(
            callFaucet({
              userAmount: payload.amount,
              amount: await api.zpSupport.toBaseUnit(payload.amount),
              address: payload.address,
            }),
          ).pipe(
            tap((msg) => toast.success(msg)),
            mergeMap((msg) =>
              of(demoActions.faucetRequestSuccess(msg), demoActions.updateBalances(null)),
            ),
          ),
        ),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.faucetRequestFailure(errMsg))
        }),
      ),
    ),
  )
}

export const demoEpics: Epic = combineEpics(
  initApi,
  mint,
  deposit,
  withdraw,
  transfer,
  updateBalances,
  getPublicBalance,
  getPrivateBalance,
  getTokenBalance,
  resetAccount,
  restoreSession,
  getWalletAddress,
  getPrivateAddress,
  updateDataAfterInitialization,
  // updateBalancesAfterTransactionPending,
  updateBalancesAfterTransactionSuccess,
  updateBalancesAfterMint,
  exportSeed,
  exportSeedSuccess,
  recowerWallet,
  recoverWalletSuccess,
  resetOnError,
  callGetTransactionsOnTransactionsModalOpen,
  getTransactions,
  callFauset,
)
