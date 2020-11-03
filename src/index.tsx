import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router';

import './index.css';

import { store, history, persistedStore } from 'shared/state';

import { ImportAccount } from 'welcome/components/ImportAccount/ImportAccount';
import { WelcomePage } from 'welcome/containers/WelcomePage/WelcomePage';
import { WalletPage } from 'wallet/containers/WalletPage/WalletPage';
import { AboutPage } from 'about/components/AboutPage/AboutPage';
import { StepThree } from 'welcome/components/StepThree/StepThree';
import { StepFour } from 'welcome/components/StepFour/StepFour';
import { StepOne } from 'welcome/components/StepOne/StepOne';
import { StepTwo } from 'welcome/components/StepTwo/StepTwo';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <ConnectedRouter history={history}>
          <Router history={history}>
            <Route path="/" exact component={WelcomePage} />
            <Route path="/wallet" exact component={WalletPage} />
            <Route path={"/create-account-step1"} exact component={StepOne} />
            <Route path={"/create-account-step2"} exact component={StepTwo} />
            <Route path={"/create-account-step3"} exact component={StepThree} />
            <Route path={"/create-account-step4"} exact component={StepFour} />
            <Route path={"/import-account"} exact component={ImportAccount} />
            <Route path={"/about"} exact component={AboutPage} />
          </Router>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
