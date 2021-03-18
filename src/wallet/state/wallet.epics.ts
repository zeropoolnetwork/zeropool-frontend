import { push } from 'connected-react-router'
import { Balance, CoinType } from 'zeropool-api-js'
import { Epic, combineEpics } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
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
  mapTo,
} from 'rxjs/operators'

import { Token, TokenSymbol, Rate } from 'shared/models'
import { promiseWithError } from 'shared/util/promise-with-error'
import { handleEpicError } from 'shared/operators/handle-epic-error.operator'
import { filterActions } from 'shared/operators/filter-actions.operator'
import toast from 'shared/helpers/toast.helper'

import {
  getActiveToken,
  getActiveWallet,
  getPollSettings,
  getSeed,
  getSendData,
  getSupportedTokens,
  getWallets,
} from 'wallet/state/wallet.selectors'
import { getNetworkFee, hdWallet, initHDWallet, transfer } from 'wallet/api/zeropool.api'
import { SendData, Wallet, WalletView } from 'wallet/state/models'
import { mapRatesToTokens } from 'wallet/state/helpers/map-rates-to-tokens'
import { updateBalances } from 'wallet/state/helpers/update-balances.helper'
import { walletsHelper } from 'wallet/state/helpers/wallets.helper'
import { walletActions } from 'wallet/state/wallet.actions'
import { RatesApi } from 'wallet/api/rates.api'

import { RootState } from 'state'
import { getPayload } from 'shared/operators/get-payload.operator'
import { notImplemented } from 'shared/util/not-implemented'

type Actions = ActionType<typeof walletActions>

const getRates$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filter(isActionOf(walletActions.getRates)),
    switchMapTo(
      (RatesApi.getRates() as Observable<Rate<Token>[]>).pipe(
        withLatestFrom(state$.pipe(map(getSupportedTokens))),
        map(([ratesData, tokens]) => mapRatesToTokens(ratesData, tokens)),
        map((rates) => walletActions.getRatesSuccess(rates))
      )
    ),
    handleEpicError(walletActions.getRatesError)
  )

const redirectToTheWalletOnSetSeed$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>
) => action$.pipe(filter(isActionOf(walletActions.setSeed)), switchMapTo(of(push('/wallet'))))

const resetAccount$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filter(isActionOf(walletActions.menu)),
    filter((action) => action.payload === WalletView.Reset),
    mergeMap((action) => {
      toast.success('Wallet reseted and data cleared')

      return of(push('/welcome'), walletActions.resetAccount())
    })
  )

const initApi$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filterActions(walletActions.openBalanceView),
    withLatestFrom(state$.pipe(map(getSeed)), state$.pipe(map(getWallets))),
    mergeMap(([, seed, wallets]) => {
      if (seed) {
        const hdw = initHDWallet(seed, [CoinType.ethereum, CoinType.near, CoinType.waves])

        return of(!wallets ? walletActions.initWallets() : walletActions.updateWallets())
      } else {
        return of(push('/welcome'), walletActions.setSeedError('Seed phrase not set'))
      }
    }),
    handleEpicError(walletActions.setSeedError)
  )

const initWallets$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filterActions(walletActions.initWallets),
    withLatestFrom(state$.pipe(map(getPollSettings)), state$.pipe(map(getSupportedTokens))),
    switchMap(([, settings, tokens]) => {
      if (!hdWallet) {
        throw Error('Api not initialized!')
      }

      return from(hdWallet.getBalances(settings.amount)).pipe(
        mergeMap((balances) => {
          const wallets: Record<TokenSymbol, Wallet[]> = {}

          for (const token of tokens) {
            const tokenId = token.symbol
            const coin = hdWallet?.getCoin(token.name as CoinType)
            wallets[tokenId] = []

            for (const [balanceDataIndex, balanceData] of Object.entries(balances[token.name])) {
              let amount
              try {
                amount = coin
                  ? +coin.fromBaseUnit((balanceData as Balance).balance)
                  : +(balanceData as Balance).balance
              } catch (err) {
                if (notImplemented(err)) {
                  amount = 0
                } else {
                  throw Error(err.message)
                }
              }

              wallets[tokenId].push({
                account: settings.account,
                address: (balanceData as Balance).address,
                id: +balanceDataIndex,
                amount,
                name: `Wallet${tokenId}${balanceDataIndex}`,
                private: false,
                token,
              })
            }

            wallets[tokenId] = walletsHelper.reduceWallets(wallets[tokenId])
          }

          return of(walletActions.getRates(), walletActions.updateWalletsSuccess({ wallets }))
        })
      )
    }),
    handleEpicError(walletActions.updateWalletsError)
  )

const updateWallets$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filterActions(walletActions.updateWallets),
    withLatestFrom(state$.pipe(map(getWallets)), state$.pipe(map(getSupportedTokens))),
    switchMap(([, wallets, tokens]) => {
      if (!hdWallet) {
        throw Error('Api not initialized!')
      }
      if (!wallets) {
        throw Error('No wallets exists at the moment!')
      }

      return updateBalances(hdWallet, wallets, tokens)
    }),
    mergeMap((wallets) => {
      toast.success('Balances updated')

      return of(walletActions.getRates(), walletActions.updateWalletsSuccess({ wallets }))
    }),
    handleEpicError(walletActions.updateWalletsError)
  )

const addWallet$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filterActions(walletActions.addWallet),
    withLatestFrom(state$.pipe(map(getWallets)), state$.pipe(map(getActiveToken))),
    switchMap(([, wallets, activeToken]) => {
      if (!hdWallet) {
        throw Error('Api not initialized!')
      }
      if (!(wallets && activeToken)) {
        throw Error('No wallets or selected token!')
      }

      const activeWallets = wallets[activeToken.symbol]
      const lastWallet = activeWallets[activeWallets.length - 1]
      const newWalletId = lastWallet.id + 1
      const coin = hdWallet.getCoin(activeToken.name as CoinType)

      if (!coin) {
        throw Error(`Can not access ${activeToken.name} data!`)
      }

      return from(
        coin.getBalances(1, newWalletId) ||
          promiseWithError(`Can't get ballance of ${activeToken.name}`)
      ).pipe(
        map((balances) =>
          walletActions.addWalletSuccess({
            wallets: {
              ...wallets,
              [activeToken.symbol]: [
                ...wallets[activeToken.symbol],
                {
                  account: lastWallet.account,
                  address: (balances as Balance[])[0].address,
                  token: { ...activeToken },
                  id: newWalletId,
                  amount: +coin.fromBaseUnit((balances as Balance[])[0].balance),
                  name: `Wallet${activeToken.symbol}${newWalletId}`,
                  private: false,
                },
              ],
            },
          })
        )
      )
    }),
    handleEpicError(walletActions.addWalletError)
  )

const refreshAmounts$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filterActions(walletActions.updateWalletsSuccess),
    map(() => walletActions.refreshAmounts())
  )

const openSendConfirmView$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filter(isActionOf(walletActions.prepareSendConfirmView)),
    getPayload(),
    switchMap((payload) =>
      getNetworkFee(payload.wallet.token).pipe(
        map((fee) =>
          walletActions.openSendConfirmView({
            ...payload,
            fee: +fee.fee,
          })
        )
      )
    ),
    handleEpicError(walletActions.apiError)
  )

const sendTransaction$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filterActions(walletActions.send),
    withLatestFrom(state$.pipe(map(getSendData)), state$.pipe(map(getActiveWallet))),
    map(([, sendData, wallet]) => ({ sendData, wallet })),
    filter(
      (value: {
        sendData: SendData | null
        wallet: Wallet | null
      }): value is { sendData: SendData; wallet: Wallet } => !!value.sendData && !!value.wallet
    ),
    switchMap(({ sendData, wallet }) =>
      transfer(wallet.id, sendData.address, sendData.amount, wallet.token).pipe(
        mapTo(walletActions.openLogView(wallet))
      )
    ),
    handleEpicError(walletActions.apiError)
  )

const handleErrorActions$: Epic = (action$: Observable<Actions>, state$: Observable<RootState>) =>
  action$.pipe(
    filter(
      isActionOf([
        walletActions.addWalletError,
        walletActions.setSeedError,
        walletActions.updateWalletsError,
        walletActions.apiError,
      ])
    ),
    tap(({ payload }) => {
      toast.error(payload)
    }),
    ignoreElements()
  )

export const walletEpics: Epic = combineEpics(
  addWallet$,
  getRates$,
  initApi$,
  resetAccount$,
  redirectToTheWalletOnSetSeed$,
  initWallets$,
  updateWallets$,
  handleErrorActions$,
  refreshAmounts$,
  openSendConfirmView$,
  sendTransaction$
)
