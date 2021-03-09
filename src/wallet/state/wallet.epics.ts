import { push } from 'connected-react-router';
import { Balance, CoinType } from 'zeropool-api-js';
import { Epic, combineEpics } from 'redux-observable';
import { from, Observable, of } from 'rxjs';
import { ActionType, isActionOf } from 'typesafe-actions';
import { switchMapTo, map, withLatestFrom, mapTo, filter, switchMap, mergeMap, ignoreElements, catchError, tap } from 'rxjs/operators';

import { Token, TokenSymbol } from 'shared/models/token';
import { handleEpicError } from 'shared/operators/handle-epic-error.operator';
import { filterActions } from 'shared/operators/filter-actions.operator';
import { Rate } from 'shared/models/rate';
import toast from 'shared/helpers/toast.helper';

import { getActiveToken, getPollSettings, getSeed, getSupportedTokens, getWallets } from 'wallet/state/wallet.selectors';
import { hdWallet, initHDWallet } from 'wallet/api/zeropool.api';
import { Wallet, WalletView } from 'wallet/state/models';
import { mapRatesToTokens } from 'wallet/state/helpers/map-rates-to-tokens';
import { walletsHelper } from 'wallet/state/helpers/wallets.helper';
import { walletActions } from 'wallet/state/wallet.actions';
import { RatesApi } from 'wallet/api/rates.api';

import { RootState } from 'state';
import { throwOnAbsence } from 'shared/util/throwOnAbsence';
import { promiseWithError } from 'shared/util/promise-with-error';

type Actions = ActionType<typeof walletActions>;

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
    handleEpicError(walletActions.getRatesError),
  );

  const redirectToTheWalletOnSetSeed$: Epic = (
    action$: Observable<Actions>,
    state$: Observable<RootState>,
  ) => 
  action$.pipe(
    filter(isActionOf(walletActions.setSeed)),
    switchMapTo(of(push('/wallet'))),
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

  const initWalletScreen$: Epic = (
    action$: Observable<Actions>,
    state$: Observable<RootState>,
  ) =>
    action$.pipe(
      filterActions(walletActions.openBalanceView),
      withLatestFrom(
        state$.pipe(map(getSeed)),
        state$.pipe(map(getWallets)),
      ),
      mergeMap(([, seed, wallets]) => {
        if (seed) {
          const hdWallet = initHDWallet(seed, [ CoinType.ethereum, CoinType.near, CoinType.waves ]);
          
          return of(!wallets ? walletActions.initWallets() : walletActions.updateWallets());
        } else {

          return of(
            push('/welcome'),
            walletActions.setSeedError('Seed phrase not set'),
          );
        }
      }),
      handleEpicError(walletActions.setSeedError),
    );

  const initWallets$: Epic = (
    action$: Observable<Actions>,
    state$: Observable<RootState>,
  ) =>
    action$.pipe(
      filterActions(walletActions.initWallets),
      withLatestFrom(
        state$.pipe(map(getPollSettings)),
        state$.pipe(map(getSupportedTokens)),
      ),
      switchMap(([, settings, tokens]) => {
        if (!hdWallet) { throw Error('Api not initialized!'); }
          
        return from(hdWallet.getBalances(settings.amount))
          .pipe(
            mergeMap((balances) => {
              const wallets: Record<TokenSymbol, Wallet[]> = {};
              
              for (const token of tokens) {
                const tokenId = token.symbol;
                wallets[tokenId] = [];

                for (const [balanceDataIndex, balanceData] of Object.entries(balances[token.name])) {
                  wallets[tokenId].push({
                    account: settings.account,
                    address: {
                      symbol: tokenId,
                      value: (balanceData as Balance).address,
                      private: false,
                    },
                    id: +balanceDataIndex,
                    amount: +(balanceData as Balance).balance,
                    name: `Wallet${tokenId}${balanceDataIndex}`,
                  });
                }

                wallets[tokenId] = walletsHelper.reduceWallets(wallets[tokenId]);
              }

              return of(
                walletActions.getRates(), 
                walletActions.updateWalletsSuccess({wallets})
              );
            }),
          )

      }),
      handleEpicError(walletActions.updateWalletsError),
    );

  const updateWallets$: Epic = (
    action$: Observable<Actions>,
    state$: Observable<RootState>,
  ) =>
    action$.pipe(
      filterActions(walletActions.updateWallets),
      withLatestFrom(
        state$.pipe(map(getWallets)),
        state$.pipe(map(getSupportedTokens)),
      ),
      switchMap(async ([, wallets, tokens]) => {
        if (!hdWallet) { throw Error('Api not initialized!'); }
        if (!wallets) { throw Error('No wallets exists at the moment!'); }

        const balances: Record<TokenSymbol, string[]> = {};
        const result: Record<string, Wallet[]> = {};

        for (let t = 0; t < tokens.length; t++) {
          const token = tokens[t];
          const tokenWallets = wallets[token.symbol];
          const promises: Promise<string>[] = [];
          const coin = hdWallet?.getCoin(token.name as CoinType);
        
          if (!coin) { throw Error(`Can not access ${token.name} data!`); }

          for (let i = 0; i < tokenWallets.length; i++) {
            const promise = coin.getBalance(tokenWallets[i].id)
              .catch(err => { 
                if (typeof(err?.message) === 'string' && err.message.includes('[-32000]')) {
                  return '0';
                } 

                throw Error(err);
              })
              .then((balance) => balance);
    
          promises.push(promise);
          }

          balances[token.symbol] =  await Promise.all(promises);
        }

        tokens.forEach((token) => {
          result[token.symbol] = wallets[token.symbol].map((wallet, index) => ({
            ...wallet,
            amount: +balances[token.symbol][index],
          }));
        })

        return result;
      }),
      mergeMap((wallets) => of(
          walletActions.getRates(), 
          walletActions.updateWalletsSuccess({wallets}),
      )),
      handleEpicError(walletActions.updateWalletsError),
    );
  
  const addWallet$: Epic = (
    action$: Observable<Actions>,
    state$: Observable<RootState>,
  ) =>
    action$.pipe(
      filterActions(walletActions.addWallet),
      withLatestFrom(
        state$.pipe(map(getWallets)),
        state$.pipe(map(getActiveToken)),
      ),
      switchMap(([, wallets, activeToken]) => {
        if (!hdWallet) { throw Error('Api not initialized!'); }
        if (!(wallets && activeToken)) { throw Error('No wallets or selected token!'); }

        const activeWallets = wallets[activeToken.symbol];
        const lastWallet = activeWallets[activeWallets.length - 1];
        const newWalletId = lastWallet.id + 1;

        return from(
          hdWallet.getCoin(activeToken.name as CoinType)?.getBalances(1, newWalletId) || 
          promiseWithError(`Can't get ballance of ${activeToken.name}`)
        ).pipe(
          map((balances) => walletActions.addWalletSuccess({ 
            wallets: {
              ...wallets,
              [activeToken.symbol]: [
                ...wallets[activeToken.symbol],
                {
                  account: lastWallet.account,
                  address: {
                    symbol: activeToken.symbol,
                    value: (balances as Balance[])[0].address,
                    private: false,
                  },
                  id: newWalletId,
                  amount: +(balances as Balance[])[0].balance,
                  name: `Wallet${activeToken.symbol}${newWalletId}`,
                }
              ]
            }
          }))
        )
      }),
      handleEpicError(walletActions.addWalletError),
    );

    const handleErrorActions$: Epic = (
      action$: Observable<Actions>,
      state$: Observable<RootState>,
    ) =>
      action$.pipe(
        filter(isActionOf([
          walletActions.addWalletError,
          walletActions.setSeedError,
          walletActions.updateWalletsError,
        ])),
        tap(({payload}) => {
          toast.error(payload);
        }),
        ignoreElements(),
      );


export const walletEpics: Epic = combineEpics(
  addWallet$,
  getRates$,
  initWalletScreen$,
  resetAccount$,
  redirectToTheWalletOnSetSeed$,
  initWallets$,
  updateWallets$,
  handleErrorActions$,
);
