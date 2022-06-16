// tslint:disable: prettier max-line-length
import { catchError, filter, from, map, mergeMap, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs'
import { combineEpics, Epic, ofType } from 'redux-observable'
import { PayloadAction } from '@reduxjs/toolkit'

import * as api from 'wallet/api/zeropool.api'
import { selectSeed } from 'wallet/state/wallet.selectors'
import { demoActions } from 'wallet/state/demo.reducer'

import { RootState } from 'state'

import toast from 'shared/helpers/toast.helper'
//import { debug } from 'shared/operators/debug.operator'
import { isString } from 'shared/utils/is'
// tslint:enable: prettier max-line-length

type Action$ = Observable<PayloadAction>
type State$ = Observable<RootState>

const resetAccount: Epic = (action$: Action$) =>
  action$.pipe(
    filter(demoActions.resetAccount.match),
    tap((a) => toast.success('Wallet reseted and data cleared')),
    map(() => demoActions.resetAccount(null)),
  )

const mint: Epic = (action$, state$) =>
  action$.pipe(
    filter(demoActions.mint.match),
    tap(() => toast.info('Minting...')),
    switchMap(({ payload }) =>
      from(api.mint(payload)).pipe(
        tap(() => toast.success('Mint success')),
        map((res) => demoActions.mintSuccess(payload)),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.mintFalure(errMsg))
        }),
      ),
    ),
  )

const deposit: Epic = (action$, state$) =>
  action$.pipe(
    filter(demoActions.deposit.match),
    tap(() => toast.info('Depositing...')),
    switchMap(({ payload }) =>
      from(api.depositShielded(payload)).pipe(
        tap(() => toast.success('Deposit success, pls update balances in a while')),
        map((res) => demoActions.depositSuccess(payload)),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.depositFalure(errMsg))
        }),
      ),
    ),
  )

const withdraw: Epic = (action$, state$) =>
  action$.pipe(
    filter(demoActions.withdraw.match),
    tap(() => toast.info('Withdrawing...')),
    switchMap(({ payload }) =>
      from(api.withdrawShielded(payload)).pipe(
        tap(() => toast.success('Withdraw success, pls update balances in a while')),
        map((res) => demoActions.withdrawSuccess(payload)),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.withdrawFalure(errMsg))
        }),
      ),
    ),
  )

const transfer: Epic = (action$, state$) =>
  action$.pipe(
    filter(demoActions.transfer.match),
    tap(() => toast.info('Processing private transfer...')),
    switchMap(({ payload }) =>
      from(api.transferShielded(payload.to, payload.tokens)).pipe(
        tap(() => toast.success('Private transfer success, pls update balances in a while')),
        map((res) => demoActions.transferSuccess(res)),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.transferFalure(errMsg))
        }),
      ),
    ),
  )

const initApi = (action$: Action$, state$: State$) =>
  action$.pipe(
    ofType(demoActions.initApi.type),
    withLatestFrom(state$.pipe(map(selectSeed))),
    filter(([, seed]) => seed !== null),
    map(([, seed]) => seed),
    filter(isString),
    tap(() => toast.info('Initializing wallet...')),
    switchMap((seed) =>
      from(
        api.init(
          seed,
          '123455678',
          // tokens.map((item) => item.name as CoinType),
        ),
      ).pipe(
        map(() => demoActions.initApiSuccess(null)),
        tap(() => toast.success('Wallet initialized')),
        catchError((errMsg: string) => {
          toast.error(errMsg)

          return of(demoActions.initApiFailure(errMsg))
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
  getWalletAddress,
  getPrivateAddress,
  updateDataAfterInitialization,
  updateBalancesAfterDeposit,
  updateBalancesAfterMint,
  updateBalancesAfterWithdraw,
)
