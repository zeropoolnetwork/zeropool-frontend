import { push } from 'connected-react-router'
import { Epic, combineEpics } from 'redux-observable'
import { from, iif, Observable, of } from 'rxjs'
import { ActionType, isActionOf } from 'typesafe-actions'
import {
  switchMapTo,
  map,
  withLatestFrom,
  filter,
  switchMap,
  mergeMap,
  ignoreElements,
  tap,
} from 'rxjs/operators'

import toast from 'shared/helpers/toast.helper'
import { Token } from 'shared/models'
import { handleEpicError } from 'shared/operators/handle-epic-error.operator'
import { filterActions } from 'shared/operators/filter-actions.operator'

import {
  getActiveToken,
  getActiveView,
  getActiveWallet,
  getPollSettings,
  getSeed,
  getSendData,
  getSupportedTokens,
  getWallets,
} from 'wallet/state/wallet.selectors'
import { SendData, Wallet, WalletRecord, WalletView } from 'wallet/state/models'
import { mapRatesToTokens } from 'wallet/state/helpers/map-rates-to-tokens'
import { updateBalances } from 'wallet/state/helpers/update-balances.helper'
import { walletActions as actions } from 'wallet/state/wallet.actions'
import * as api from 'wallet/api/zeropool.api'
import { RatesApi } from 'wallet/api/rates.api'

import { RootState } from 'state'
import { getPayload } from 'shared/operators/get-payload.operator'
// import { initBalances } from './helpers/init-balances.helper'

type Actions = ActionType<typeof actions>

// const nextWalletId = (wallets: WalletRecord, token: Token) =>
//   wallets[token.symbol][wallets[token.symbol].length - 1].id + 1

const getRates$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filterActions(actions.getRates),
    switchMapTo(
      RatesApi.getRates().pipe(
        withLatestFrom(state$.pipe(map(getSupportedTokens))),
        map(([ratesData, tokens]) => mapRatesToTokens(ratesData, tokens)),
        map((rates) => actions.getRatesSuccess(rates)),
      ),
    ),
    handleEpicError(actions.getRatesError, 'Failed to get rates'),
  )

const redirectToTheWalletOnSetSeed$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) => action$.pipe(filterActions(actions.setSeed), switchMapTo(of(push('/wallet'))))

const resetAccount$: Epic = (action$: Observable<Actions>) =>
  action$.pipe(
    filterActions(actions.menu),
    filter((action) => action.payload === WalletView.Reset),
    tap(() => toast.success('Wallet reseted and data cleared')),
    mergeMap(() => of(push('/welcome'), actions.resetAccount())),
  )

const initApi$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filterActions(actions.openBalanceView),
    withLatestFrom(
      state$.pipe(map(getSeed)),
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
                'test'
                // tokens.map((item) => item.name as CoinType),
              ),
            ).pipe(map(() => (!wallets ? actions.initWallets() : actions.updateBalances()))),
          ),
        ),
        of(false).pipe(
          mergeMap(() => of(push('/welcome'), actions.setSeedError('Seed phrase not set'))),
        ),
      ),
    ),
    handleEpicError(actions.setSeedError, 'Failed to set seed phrase'),
  )

const initWallets$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filterActions(actions.initWallets),
    withLatestFrom(state$.pipe(map(getPollSettings)), state$.pipe(map(getSupportedTokens))),
    switchMap(([, settings, tokens]) =>
      from(api.getRegularBalance()).pipe(
        // map(([, balance]) => initBalances(balance, tokens)),
        mergeMap((wallets) => of(actions.getRates(), actions.updateWalletsSuccess({}))),
      ),
    ),
    handleEpicError(actions.updateWalletsError, 'Failed to init wallets'),
  )

const updateBalances$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filterActions(actions.updateBalances),
    withLatestFrom(state$.pipe(map(getWallets)), state$.pipe(map(getSupportedTokens))),
    map(([, wallets, tokens]) => ({ wallets, tokens })),
    filter((value): value is { wallets: WalletRecord; tokens: Token[] } => !!value.wallets),
    switchMap(({ wallets, tokens }) => updateBalances({}, wallets, tokens)),
    tap(() => toast.success('Balances updated')),
    mergeMap((wallets) => of(actions.getRates(), actions.updateWalletsSuccess(wallets))),
    handleEpicError(actions.updateWalletsError, 'Fail to update balances'),
  )

// const addWallet$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
//   action$.pipe(
//     filterActions(actions.addWallet),
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

const refreshAmounts$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filterActions(actions.updateWalletsSuccess),
    map(() => actions.refreshAmounts()),
  )

const getPrivateAddress$: Epic = (action$: Observable<Actions>) =>
  action$.pipe(
    filter(isActionOf(actions.getPrivateAddress)),
    switchMap(({ payload }) =>
      from(api.getShieldedAddress()).pipe(
        map((address) => actions.getPrivateAddressSuccess(address)),
      ),
    ),
    handleEpicError(actions.apiError, 'Falied to get private address'),
  )

// tslint:disable-next-line: max-line-length
const openSendConfirmView$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filterActions(actions.prepareSendConfirmView),
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

const sendTransaction$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filterActions(actions.send),
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
        mergeMap(() => of(actions.openWalletsView(wallet.token), actions.updateBalances())),
      ),
    ),
    handleEpicError(actions.apiError, 'Failed to send transaction'),
  )

const callGetTransactionsOnOpenTransactionsView$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filterActions(actions.openTransactionsView),
    getPayload(),
    map((wallet) => actions.getTransactions(wallet)),
  )

const callGetTransactionsOnUpdateWallets$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filterActions(actions.updateBalances),
    withLatestFrom(state$.pipe(map(getActiveView)), state$.pipe(map(getActiveWallet))),
    filter(([, view]) => view === WalletView.Transactions),
    map(([, , wallet]) => wallet),
    filter((wallet): wallet is Wallet => !!wallet),
    map((wallet) => actions.getTransactions(wallet)),
  )

// const getTransactions$: Epic = (action$: Observable<Actions>) =>
//   action$.pipe(
//     filterActions(actions.getTransactions),
//     getPayload(),
//     switchMap((wallet) =>
//       api
//         .getWalletTransactions(wallet.token, wallet.id, false)
//         .pipe(map((transactions) => actions.getTransactionsSuccess(transactions))),
//     ),
//     handleEpicError(actions.apiError, 'Failed to get transactions'),
//   )

const handleErrorActions$: Epic = (action$: Observable<Actions>) =>
  action$.pipe(
    filterActions(
      actions.addWalletError,
      actions.setSeedError,
      actions.updateWalletsError,
      actions.apiError,
    ),
    tap(({ payload }) => toast.error(payload)),
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
  redirectToTheWalletOnSetSeed$,
  initWallets$,
  updateBalances$,
  handleErrorActions$,
  refreshAmounts$,
  openSendConfirmView$,
  sendTransaction$,
  getPrivateAddress$,
)
