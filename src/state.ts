// tslint:disable: prettier
import storage from 'redux-persist/lib/storage'
import { PersistConfig } from 'redux-persist/es/types'
import { configureStore } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, CombinedState, combineReducers, Reducer } from 'redux'

import { registerSlice, RegisterState } from 'register/state/register.reducer'
import { registerEpics } from 'register/state/register.epics'

import { walletEpics } from 'wallet/state/wallet.epics'
import { walletReducer, WalletState } from 'wallet/state/wallet.reducer'

import { sharedEpics } from 'shared/state/shared.epics'
import { loadingBarSlice, LoadingBarState } from 'shared/loading-bar/state/loading-bar.reducer'

import { stateMigrations } from 'state-migrations'
//#region Setup Epics
const epicMiddleware = createEpicMiddleware()

const epics = combineEpics(registerEpics, walletEpics, sharedEpics)
//#endregion

//#region Setup Reducers
export const createRootReducer = () =>
  combineReducers({
    register: registerSlice.reducer,
    wallet: walletReducer,
    shared: combineReducers({
      loadingBar: loadingBarSlice.reducer,
    }),
  })
//#endregion

//#region Setup Persisted Store
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 0,
  storage,
  migrate: createMigrate(stateMigrations, { debug: false }),
  whitelist: ['register', 'wallet'],
}

const persistedReducer = persistReducer<any, any>(persistConfig, createRootReducer())

export const store = configureStore({
  reducer: persistedReducer as Reducer<RootState>,
  middleware: [epicMiddleware],
})

export const persistedStore = persistStore(store)
//#endregion

//#region Setup React Redux Toolkit
export type RootState = CombinedState<{
  register: RegisterState
  wallet: WalletState
  shared: CombinedState<{
    loadingBar: LoadingBarState;
  }>;
}>

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
//#endregion

epicMiddleware.run(epics)
// tslint:enable: prettier
