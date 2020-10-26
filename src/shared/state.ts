import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist/es/types';
import { createBrowserHistory, History } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import { welcomePageReducer } from 'welcome/state/welcome-page.reducers';
import { welcomePageEpics } from 'welcome/state/welcome-page.epics';

import { stateMigrations } from 'shared/state-migrations';

//#region Setup Devtools 
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: <R>(a: R) => R;
  }
}

const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = devToolsCompose || compose;
//#endregion

//#region Setup Epics
const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(
  welcomePageEpics,
  // walletPageEpics,
  // alertsEpics,
  // notificationsEpics,
);
//#endregion 

//#region Setup Reducers
export type RootState = NonNullable<
  Parameters<ReturnType<typeof createRootReducer>>[0]
>;

export const history = createBrowserHistory();

export const createRootReducer = (history: History) =>
  combineReducers({
    welcomePage: welcomePageReducer,
    // walletPage: walletPageReducer,
    router: connectRouter(history),
    // shared: combineReducers({
    //   // alerts: alertsReducer,
    //   // notifications: notificationsReducer,
    //   // menuBar: menuBarReducer,
    // })
  });
//#endregion

//#region Setup Persisted Store
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 0,
  storage,
  migrate: createMigrate(stateMigrations, { debug: false }),
  whitelist: ['welcomePage'],
};

const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history),
);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(epicMiddleware, routerMiddleware(history))),
);

export const persistedStore = persistStore(store);
//#endregion

epicMiddleware.run(rootEpic);