import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router, Route, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router';
import { Container, ThemeProvider } from '@material-ui/core';

import './index.css';

import { store, history, persistedStore } from 'state';

import { CreateAccountPage } from 'register/containers/CreateAccount/CreateAccountPage';
import { WalletPage } from 'wallet/containers/WalletPage/WalletPage';
import { AboutPage } from 'about/components/AboutPage/AboutPage';
import { theme } from 'theme';

ReactDOM.render(
  <Container>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate persistor={persistedStore}>
            <ConnectedRouter history={history}>
              <Router history={history}>
                <Route path="/" exact component={CreateAccountPage} />
                <Route path="/about" exact component={AboutPage} />
                <Route path="/wallet" exact component={WalletPage} />
                <Route path="/zeropool" exact ><Redirect to="/" /></Route>
              </Router>
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      </React.StrictMode>
    </ThemeProvider>
  </Container>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
