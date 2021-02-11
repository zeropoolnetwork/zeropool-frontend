import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { SnackbarProvider } from 'notistack';
import { Router, Route, Redirect, Switch } from 'react-router-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import { store, history, persistedStore } from 'state';
import { http, setupInterceptors } from 'shared/http/http';
import { CreateAccountPage } from 'register/containers/CreateAccount/CreateAccountPage';
import { WalletPage } from 'wallet/containers/WalletPage/WalletPage';
import { LoadingBar } from 'shared/loading-bar/containers/loading-bar/loading-bar.component';
import { AboutPage } from 'shared/components/AboutPage/AboutPage';
import { timeout } from 'shared/util/timeout';
import { theme } from 'theme';

setupInterceptors(http(), store);

async function start() {
  await timeout(1000);

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={5} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <React.StrictMode>
          <Provider store={store}>
            <PersistGate persistor={persistedStore}>
              <ConnectedRouter history={history}>
                <Router history={history}>
                  <Switch>
                    <Route path="/welcome" exact component={CreateAccountPage} />
                    <Route path="/about" exact component={AboutPage} />
                    <Route path="/wallet" exact component={WalletPage} />
                    <Route><Redirect to="/welcome" /></Route>
                  </Switch>
                </Router>
              </ConnectedRouter>
              <LoadingBar />
            </PersistGate>
          </Provider>
        </React.StrictMode>
      </SnackbarProvider>
    </ThemeProvider>,
    document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
start();
