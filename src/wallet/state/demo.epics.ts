// tslint:disable: prettier max-line-length
import { catchError, filter, from, ignoreElements, map, mergeMap, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs'
import { combineEpics, Epic } from 'redux-observable'
import { PayloadAction } from '@reduxjs/toolkit'

import * as api from 'wallet/api/zeropool.api'
import { demoActions } from 'wallet/state/demo.reducer'
import { selectInitials } from 'wallet/state/demo.selectors'

import { RootState } from 'state'

import toast from 'shared/helpers/toast.helper'
import { debug } from 'shared/operators/debug.operator'
import { isNonNull } from 'shared/operators/is-not-null'
// tslint:enable: prettier max-line-length

type Action$ = Observable<PayloadAction>
type State$ = Observable<RootState>

const initApi = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.initApi.match),
    withLatestFrom(state$.pipe(map(selectInitials))),
    map(([, initials]) => initials),
    filter((initials) => !!initials),
    tap(() => toast.info('Initializing, it can take up to few minutes...', { key: 'initApi', persist: true })),
    switchMap((initials) =>
      from(
        api.init(
          (initials as any).seed,
          (initials as any).password,
        ),
      ).pipe(
        map(() => demoActions.initApiSuccess(null)),
        tap(() => toast.close('initApi')),
        tap(() => toast.success('Wallet initialized')),
        catchError((errMsg: string) => {
          toast.close('initApi')
          toast.error(errMsg)

          return of(demoActions.initApiFailure(errMsg))
        }),
      ),
    ),
  )

const mint: Epic = (action$, state$) =>
  action$.pipe(
    filter(demoActions.mint.match),
    tap(({ payload }) => toast.info(`Minting ${payload} tokens...`, { key: 'mint', persist: true })),
    switchMap(({ payload }) =>
      from(api.mint(payload)).pipe(
        tap(() => toast.close('mint')),
        tap(() => toast.success('Mint success')),
        map((res) => demoActions.mintSuccess(+payload)),
        catchError((errMsg: string) => {
          toast.close('mint')
          toast.error(errMsg)

          return of(demoActions.mintFalure(errMsg))
        }),
      ),
    ),
  )

const deposit: Epic = (action$, state$) =>
  action$.pipe(
    filter(demoActions.deposit.match),
    tap(({ payload }) => toast.info(`Depositing ${payload} tokens...`, { key: 'deposit', persist: true })),
    switchMap(({ payload }) =>
      from(api.depositShielded(payload)).pipe(
        tap(() => toast.close('deposit')),
        tap(() => toast.success('Deposit success, pls update balances in a while')),
        map((res) => demoActions.depositSuccess(payload)),
        catchError((errMsg: string) => {
          toast.close('deposit')
          toast.error(errMsg)

          return of(demoActions.depositFalure(errMsg))
        }),
      ),
    ),
  )

const withdraw: Epic = (action$, state$) =>
  action$.pipe(
    filter(demoActions.withdraw.match),
    tap((payload) => toast.info(`Withdrawing ${payload} tokens...`, { key: 'withdraw', persist: true })),
    switchMap(({ payload }) =>
      from(api.withdrawShielded(payload)).pipe(
        tap(() => toast.close('withdraw')),
        tap(() => toast.success('Withdraw success, pls update balances in a while')),
        map((res) => demoActions.withdrawSuccess(payload)),
        catchError((errMsg: string) => {
          toast.close('withdraw')
          toast.error(errMsg)

          return of(demoActions.withdrawFalure(errMsg))
        }),
      ),
    ),
  )

const transfer: Epic = (action$, state$) =>
  action$.pipe(
    filter(demoActions.transfer.match),
    tap((payload) => toast.info(`Processing private transfer of ${payload} tokens...`, { key: 'tranfer', persist: true })),
    switchMap(({ payload }) =>
      from(api.transferShielded(payload.to, payload.tokens)).pipe(
        tap(() => toast.close('tranfer')),
        tap(() => toast.success('Private transfer success, pls update balances in a while')),
        map((res) => demoActions.transferSuccess(res)),
        catchError((errMsg: string) => {
          toast.close('tranfer')
          toast.error(errMsg)

          return of(demoActions.transferFalure(errMsg))
        }),
      ),
    ),
  )

const getPublicBalance = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.updateBalances.match),
    mergeMap(() =>
      from(api.getRegularBalance()).pipe(
        map((balance) => demoActions.publicBalance(+balance)),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.updateBalancesFailure(errMsg))
        }),
      ),
    ),
  )

const getTokenBalance = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.updateBalances.match),
    mergeMap(() =>
      from(api.getTokenBalance()).pipe(
        map((balance) => demoActions.tokenBalance(+balance)),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.updateBalancesFailure(errMsg))
        }),
      ),
    ),
  )

const getPrivateBalance = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.updateBalances.match),
    mergeMap(() =>
      from(api.getShieldedBalances()).pipe(
        map((balance) => demoActions.privateBalance(+balance)),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.updateBalancesFailure(errMsg))
        }),
      ),
    ),
  )

const getWalletAddress = (action$: Action$, state$: State$) =>
  action$.pipe(
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

const getPrivateAddress = (action$: Action$, state$: State$) =>
  action$.pipe(
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

const updateDataAfterInitialization = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.initApiSuccess.match),
    mergeMap(() => of(
      demoActions.getWalletAddress(null),
      demoActions.getPrivateAddress(null),
      demoActions.updateBalances(null),
    )),
  )

const updateBalancesAfterMint = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.mintSuccess.match),
    map(() => demoActions.updateBalances(null)),
  )

const updateBalancesAfterDeposit = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.depositSuccess.match),
    map(() => demoActions.updateBalances(null)),
  )

const updateBalancesAfterWithdraw = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.withdrawSuccess.match),
    map(() => demoActions.updateBalances(null)),
  )

const exportSeed = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.exportSeed.match),
    mergeMap(({payload}) =>
      from(api.getSeed(payload)).pipe(
        map((seed) => demoActions.exportSeedSuccess(seed)),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.exportSeedFailure(errMsg))
        }),
      ),
    ),
  )

const exportSeedSuccess = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.exportSeedSuccess.match),
    tap(({payload}) => {
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

const resetAccount: Epic = (action$: Action$) =>
  action$.pipe(
    filter(demoActions.resetAccount.match),
    tap(() => {
      sessionStorage.clear()
      localStorage.clear()
      caches.keys().then(keys => {
        keys.forEach(key => caches.delete(key))
      })
      indexedDB.databases().then(dbs => {
        dbs.forEach(db => indexedDB.deleteDatabase((db as any).name))
      })
    }),
    tap((a) => toast.success('Wallet reseted and data cleared')),
    ignoreElements(),
  )

const restoreSession = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.initApi.match),
    withLatestFrom(state$.pipe(map(selectInitials))),
    filter(([, initials]) => !initials),
    mergeMap(() => {
      let seed, password
      // first we try to restore session from SessionStorage (for development)
      seed = api.getDevSeed()
      password = api.getDevPassword()

      if (!seed || !password) {
        // if not found, we run recovery proccess
        return of(demoActions.recoverWallet(null))
      } else {
        return of(
          demoActions.setSeedAndPasword({seed, password}),
          demoActions.initApi(null),
        )
      }
    }),
  )

const recowerWallet = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.recoverWallet.match),
    map(({payload}) => payload),
    filter(isNonNull),
    mergeMap((password) =>
      from(api.getSeed(password)).pipe(
        map((seed) => demoActions.recoverWalletSuccess({seed, password})),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.recoverWalletFailure(errMsg))
        }),
      ),
    ),
  )

const recoverWalletSuccess = (action$: Action$, state$: State$) =>
  action$.pipe(
    filter(demoActions.recoverWalletSuccess.match),
    mergeMap(({payload}) => of(
      demoActions.setSeedAndPasword(payload),
      demoActions.initApi(null),
    )),
  )

export const demoEpics: Epic = combineEpics(
  initApi,
  mint,
  deposit,
  withdraw,
  transfer,
  getPublicBalance,
  getPrivateBalance,
  getTokenBalance,
  resetAccount,
  restoreSession,
  getWalletAddress,
  getPrivateAddress,
  updateDataAfterInitialization,
  updateBalancesAfterDeposit,
  updateBalancesAfterMint,
  updateBalancesAfterWithdraw,
  exportSeed,
  exportSeedSuccess,
  recowerWallet,
  recoverWalletSuccess,
)
