// tslint:disable: prettier
import storage from 'redux-persist/lib/storage'
import { PersistConfig } from 'redux-persist/es/types'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, Reducer } from 'redux'
import { createBrowserHistory, History } from 'history'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { registerReducer } from 'register/state/register.reducer'
import { registerEpics } from 'register/state/register.epics'

import { stateMigrations } from 'state-migrations'
import { walletReducer } from 'wallet/state/wallet.reducer'
import { walletEpics } from 'wallet/state/wallet.epics'
import { loadingBarReducer } from 'shared/loading-bar/state/loading-bar.reducer'

//#region Setup React Redux Toolkit

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
//#endregion

//#region Setup Epics
const epicMiddleware = createEpicMiddleware()

const epics = combineEpics(
  registerEpics,
  walletEpics,
  // alertsEpics,
  // notificationsEpics,
)
//#endregion

//#region Setup Reducers
export const createRootReducer = (_history: History) =>
  combineReducers({
    register: registerReducer.reducer,
    account: walletReducer,
    // router: connectRouter(_history),
    shared: combineReducers({
      loadingBar: loadingBarReducer,
      //   // alerts: alertsReducer,
      //   // notifications: notificationsReducer,
      //   // menuBar: menuBarReducer,
    }),
  })
//#endregion

//#region Setup Persisted Store
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 0,
  storage,
  migrate: createMigrate(stateMigrations, { debug: false }),
  whitelist: ['register', 'account'],
}

const persistedReducer: Reducer = 
  persistReducer(persistConfig, createRootReducer(createBrowserHistory()))

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [epicMiddleware],
})

export const persistedStore = persistStore(store)
//#endregion

epicMiddleware.run(epics)


