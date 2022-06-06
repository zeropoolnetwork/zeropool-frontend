// tslint:disable: prettier max-line-length
import { switchMapTo, map, withLatestFrom, filter, switchMap, mergeMap, ignoreElements, tap } from 'rxjs/operators'
import { from, iif, Observable, of } from 'rxjs'
import { Epic, combineEpics } from 'redux-observable'
import { PayloadAction } from '@reduxjs/toolkit'

import toast from 'shared/helpers/toast.helper'
import { Token } from 'shared/models'
import { getPayload } from 'shared/operators/get-payload.operator'
import { handleEpicError } from 'shared/operators/handle-epic-error.operator'

import { getActiveToken, getActiveView, getActiveWallet, getPollSettings, selectSeed, getSendData, getSupportedTokens, getWallets } from 'wallet/state/wallet.selectors'
import { SendData, Wallet, WalletRecord, WalletView } from 'wallet/state/models'
import { walletActions as actions } from 'wallet/state/wallet.actions'
import { mapRatesToTokens } from 'wallet/state/helpers/map-rates-to-tokens'
import { updateBalances } from 'wallet/state/helpers/update-balances.helper'
import { RatesApi } from 'wallet/api/rates.api'
import * as api from 'wallet/api/zeropool.api'

import { RootState } from 'state'
import { debug } from 'shared/operators/debug.operator'
// tslint:enable: prettier max-line-length
// import { initBalances } from './helpers/init-balances.helper'

// const nextWalletId = (wallets: WalletRecord, token: Token) =>
//   wallets[token.symbol][wallets[token.symbol].length - 1].id + 1

const getRates$: Epic = (
  action$: Observable<PayloadAction>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(actions.getRates.match),
    switchMapTo(
      RatesApi.getRates().pipe(
        withLatestFrom(state$.pipe(map(getSupportedTokens))),
        map(([ratesData, tokens]) => mapRatesToTokens(ratesData, tokens)),
        map((rates) => actions.getRatesSuccess(rates)),
      ),
    ),
    handleEpicError(actions.getRatesError, 'Failed to get rates'),
  )

// const redirectToTheWalletOnSetSeed$: Epic = (
//   action$: Observable<PayloadAction>,
//   state$: Observable<RootState>,
// ) => action$.pipe(filter(actions.setSeed), switchMapTo(of(navigate.to('/wallet'))))

const resetAccount$: Epic = (action$: Observable<PayloadAction>) =>
  action$.pipe(
    filter(actions.menu.match),
    filter(({ payload }) => payload === WalletView.Reset),
    tap((a) => toast.success('Wallet reseted and data cleared')),
    mergeMap(() => of(actions.resetAccount())),
  )

const initApi$: Epic = (
  action$: Observable<PayloadAction>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(actions.openBalanceView.match),
    withLatestFrom(
      state$.pipe(map(selectSeed)),
      state$.pipe(map(getWallets)),
      // state$.pipe(map(getSupportedTokens)),
    ),
    switchMap(([, _seed, wallets]) =>
      iif(
        () => !!_seed,
        of(_seed).pipe(
          filter((seed): seed is string => typeof seed === 'string'),
          switchMap((seed) =>
            from(
              api.init(
                seed,
                '123455678',
                'test',
                // tokens.map((item) => item.name as CoinType),
              ),
            ).pipe(
              map(() => (!wallets ? actions.initWallets() : actions.updateBalances())),
            ),
          ),
        ),
        of(false).pipe(
          // tslint:disable-next-line: prettier
          mergeMap(() => of(actions.setSeedError('Seed phrase not set')),
          ),
        ),
      ),
    ),
    handleEpicError(actions.setSeedError, 'Failed to set seed phrase'),
  )

const initWallets$: Epic = (
  action$: Observable<PayloadAction>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(actions.initWallets.match),
    withLatestFrom(
      state$.pipe(map(getPollSettings)),
      state$.pipe(map(getSupportedTokens)),
    ),
    switchMap(([, settings, tokens]) =>
      from(api.getRegularBalance()).pipe(
        // map(([, balance]) => initBalances(balance, tokens)),
        mergeMap((wallets) => of(actions.getRates(), actions.updateWalletsSuccess({}))),
      ),
    ),
    handleEpicError(actions.updateWalletsError, 'Failed to init wallets'),
  )

const updateBalances$: Epic = (
  action$: Observable<PayloadAction>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(actions.updateBalances.match),
    withLatestFrom(state$.pipe(map(getWallets)), state$.pipe(map(getSupportedTokens))),
    map(([, wallets, tokens]) => ({ wallets, tokens })),
    filter((v): v is { wallets: WalletRecord; tokens: Token[] } => !!v.wallets),
    switchMap(({ wallets, tokens }) => updateBalances({}, wallets, tokens)),
    tap(() => toast.success('Balances updated')),
    mergeMap((wallets) => of(actions.getRates(), actions.updateWalletsSuccess(wallets))),
    handleEpicError(actions.updateWalletsError, 'Fail to update balances'),
  )

// const addWallet$: Epic = (
// action$: Observable<PayloadAction>,
// state$: Observable<RootState>,
// ) =>
//   action$.pipe(
//     filter(actions.addWallet.match),
//     withLatestFrom(state$.pipe(map(getWallets)), state$.pipe(map(getActiveToken))),
//     map(([, wallets, token]) => ({ wallets, token })),
//     filter(
//       (value): value is { wallets: WalletRecord; token: Token } =>
//          !!value.wallets && !!value.token,
//     ),
//     switchMap(({ wallets, token }) =>
//       api.getWalletBalance(token, nextWalletId(wallets, token) - 1).pipe(
//         map((balance) =>
//           actions.addWalletSuccess({
//             ...wallets,
//             [token.symbol]: [
//               ...wallets[token.symbol],
//               {
//                 account: defaultAccount,
//                 address: balance.address,
//                 token: { ...token },
//                 id: nextWalletId(wallets, token),
//                 amount: +balance.balance,
//                 name: `Wallet${token.symbol}${nextWalletId(wallets, token)}`,
//               },
//             ],
//           }),
//         ),
//       ),
//     ),
//     handleEpicError(actions.addWalletError, 'Failed to add wallet'),
//   )

const refreshAmounts$: Epic = (
  action$: Observable<PayloadAction>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(actions.updateWalletsSuccess.match),
    map(() => actions.refreshAmounts()),
  )

const getPrivateAddress$: Epic = (action$: Observable<PayloadAction>) =>
  action$.pipe(
    filter(actions.getPrivateAddress.match),
    switchMap(({ payload }) =>
      from(api.getShieldedAddress()).pipe(
        map((address) => actions.getPrivateAddressSuccess(address)),
      ),
    ),
    handleEpicError(actions.apiError, 'Falied to get private address'),
  )

// tslint:disable-next-line: max-line-length
const openSendConfirmView$: Epic = (action$: Observable<PayloadAction>) =>
  action$.pipe(
    filter(actions.prepareSendConfirmView.match),
    getPayload(),
    switchMap((payload) =>
      //  api.getNetworkFee(payload.wallet.token).pipe(
      from([0]).pipe(
        map((fee: any) =>
          actions.openSendConfirmView({
            ...payload,
            fee: fee.fee,
          }),
        ),
      ),
    ),
    handleEpicError(actions.apiError, 'Failed to get network fee'),
  )

const sendTransaction$: Epic = (
  action$: Observable<PayloadAction>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(actions.send.match),
    withLatestFrom(state$.pipe(map(getSendData)), state$.pipe(map(getActiveWallet))),
    map(([, sendData, wallet]) => ({ sendData, wallet })),
    filter(
      (value): value is { sendData: SendData; wallet: Wallet } =>
        !!value.sendData && !!value.wallet,
    ),
    switchMap(({ sendData, wallet }) =>
      from(api.transfer(sendData.address, sendData.amount)).pipe(
        tap(() => toast.success('Transaction completed successfully')),
        // TODO: change after implementing the Log
        // mapTo(actions.openTransactionsView(wallet)),
        mergeMap(() =>
          of(actions.openWalletsView(wallet.token), actions.updateBalances()),
        ),
      ),
    ),
    handleEpicError(actions.apiError, 'Failed to send transaction'),
  )

const callGetTransactionsOnOpenTransactionsView$: Epic = (
  action$: Observable<PayloadAction>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(actions.openTransactionsView.match),
    getPayload(),
    map((wallet) => actions.getTransactions(wallet)),
  )

const callGetTransactionsOnUpdateWallets$: Epic = (
  action$: Observable<PayloadAction>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(actions.updateBalances.match),
    withLatestFrom(state$.pipe(map(getActiveView)), state$.pipe(map(getActiveWallet))),
    filter(([, view]) => view === WalletView.Transactions),
    map(([, , wallet]) => wallet),
    filter((wallet): wallet is Wallet => !!wallet),
    map((wallet) => actions.getTransactions(wallet)),
  )

// const getTransactions$: Epic = (action$: Observable<PayloadAction>) =>
//   action$.pipe(
//     filter(actions.getTransactions.match),
//     getPayload(),
//     switchMap((wallet) =>
//       api
//         .getWalletTransactions(wallet.token, wallet.id, false)
//         .pipe(map((transactions) => actions.getTransactionsSuccess(transactions))),
//     ),
//     handleEpicError(actions.apiError, 'Failed to get transactions'),
//   )

const handleErrorActions$: Epic = (action$: Observable<PayloadAction>) =>
  action$.pipe(
    filter(
      (action) =>
        actions.updateWalletsError.match(action) ||
        actions.addWalletError.match(action) ||
        actions.setSeedError.match(action) ||
        actions.apiError.match(action),
    ),
    tap(({ payload }) => toast.error(payload as any)),
    ignoreElements(),
  )

export const walletEpics: Epic = combineEpics(
  // addWallet$,
  getRates$,
  //   getTransactions$,
  callGetTransactionsOnOpenTransactionsView$,
  callGetTransactionsOnUpdateWallets$,
  initApi$,
  resetAccount$,
  // redirectToTheWalletOnSetSeed$,
  initWallets$,
  updateBalances$,
  handleErrorActions$,
  refreshAmounts$,
  openSendConfirmView$,
  sendTransaction$,
  getPrivateAddress$,
)
