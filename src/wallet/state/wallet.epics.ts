import { push } from 'connected-react-router';
import { Balance, CoinType } from 'zeropool-api-js';
import { from, Observable, of } from 'rxjs';
import { Epic, combineEpics } from 'redux-observable';
import { ActionType, isActionOf } from 'typesafe-actions';
import { switchMapTo, map, withLatestFrom, mapTo, filter, switchMap, mergeMap } from 'rxjs/operators';

import { Token, TokenSymbol } from 'shared/models/token';
import { filterActions } from 'shared/operators/filter-actions.operator';
import { Rate } from 'shared/models/rate';
import toast from 'shared/helpers/toast.helper';

import { getPollSettings, getSeed, getSupportedTokens, getWallets } from 'wallet/state/wallet.selectors';
import { hdWallet, initHDWallet } from 'wallet/api/zeropool.api';
import { Wallet, WalletView } from 'wallet/state/models';
import { mapRatesToTokens } from 'wallet/state/helpers/map-rates-to-tokens';
import { walletActions } from 'wallet/state/wallet.actions';
import { RatesApi } from 'wallet/api/rates.api';

import { RootState } from 'state';

type Actions = ActionType<typeof walletActions>;

const openBalance$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filterActions(walletActions.openBalanceView),
    mapTo(walletActions.getRates()),
  )

const getRates$: Epic = (
  action$: Observable<Actions>,
  state$: Observable<RootState>,
) =>
  action$.pipe(
    filter(isActionOf(walletActions.getRates)),
    switchMapTo((RatesApi.getRates() as Observable<Rate<Token>[]>).pipe(
      withLatestFrom(state$.pipe(map(getSupportedTokens))),
      map(([ratesData, tokens]) => mapRatesToTokens(ratesData, tokens)),
      map(rates => walletActions.getRatesSuccess(rates))
    )),
  );

  const redirectToTheWallet$: Epic = (
    action$: Observable<Actions>,
    state$: Observable<RootState>,
  ) => 
  action$.pipe(
    filter(isActionOf(walletActions.setSeed)),
    switchMapTo(of(push('/wallet'))),
  );

  const initWallet$: Epic = (
    action$: Observable<Actions>,
    state$: Observable<RootState>,
  ) =>
    action$.pipe(
      filter(isActionOf(walletActions.openBalanceView)),
      withLatestFrom(state$.pipe(map(getSeed))),
      mergeMap(([, seed]) => {
        if (seed) {
          const hdWallet = initHDWallet(seed, [ CoinType.ethereum, CoinType.near, CoinType.waves ]);
          
          toast.success('Wellcome to ZPWallet!');
          
          return of(walletActions.setSeedSuccess());
        } else {
          toast.error('Seed phrase not set');

          return of(
            push('/welcome'),
            walletActions.setSeedError(),
          );
        }
      }),
    );

  const resetAccount$: Epic = (
    action$: Observable<Actions>,
    state$: Observable<RootState>,
  ) =>
    action$.pipe(
      filter(isActionOf(walletActions.menu)),
      filter(action => action.payload === WalletView.Reset),
      mergeMap(action => {
          toast.success('Wallet reseted and data cleared');
          
          return of(
            push('/welcome'), 
            walletActions.resetAccount(),
          );
      }),
    );

  const updateWallets$: Epic = (
    action$: Observable<Actions>,
    state$: Observable<RootState>,
  ) =>
    action$.pipe(
      filter(isActionOf(walletActions.setSeedSuccess)),
      withLatestFrom(
        state$.pipe(map(getWallets)), 
        state$.pipe(map(getPollSettings)),
        state$.pipe(map(getSupportedTokens)),
      ),
      switchMap(([, wallets, settings, tokens]) => {
        console.log('wallets: ', wallets);

        if (hdWallet) {
          if (!wallets) {

            return from(hdWallet.getBalances(settings.amount))
              .pipe(
                map((balances) => {
                  const wallets: Record<TokenSymbol, Wallet[]> = {};
                  
                  for (const token of tokens) {
                    wallets[token.symbol] = [];

                    for (const [balanceDataIndex, balanceData] of Object.entries(balances[token.name])) {
                      wallets[token.symbol].push({
                        account: 0,
                        address: {
                          symbol: token.symbol,
                          value: (balanceData as Balance).address,
                          private: false,
                        },
                        amount: +(balanceData as Balance).balance,
                        name: `Wallet${token.symbol}${balanceDataIndex}`,
                      });
                    }
                  }

                  return walletActions.updateWallets({wallets});
                }),
              )
          } else {

            return from(hdWallet.getBalances(settings.amount))
            .pipe(
              map((balances) => walletActions.updateWallets({wallets}))
            );
          }
        }

        return of(walletActions.updateWallets({wallets: null}));
      }),
    );

export const walletEpics: Epic = combineEpics(
  getRates$,
  initWallet$,
  openBalance$,
  resetAccount$,
  redirectToTheWallet$,
  updateWallets$,
);
