// @ts-nocheck
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { createBrowserHistory } from 'history'
import { Router, Route, Navigate, Routes } from 'react-router-dom'

import './index.css'
import * as serviceWorker from './serviceWorker'

import { SnackbarUtilsConfigurator } from 'shared/helpers/toast.helper'
import { http, setupInterceptors } from 'shared/http/http'
import { LoadingBar } from 'shared/loading-bar/containers/loading-bar/loading-bar.component'
import { AboutPage } from 'shared/components/AboutPage/AboutPage'
import { timeout } from 'shared/util/timeout'
import { store, persistedStore } from 'state'
import { CreateAccountPage } from 'register/containers/CreateAccount/CreateAccountPage'
import { WalletPage } from 'wallet/containers/WalletPage/WalletPage'
import { theme } from 'theme'
import { DemoPage } from 'wallet/containers/DemoPage/DemoPage'

const history = createBrowserHistory()
const root = createRoot(document.getElementById('root'))

setupInterceptors(http(), store)

async function start() {
  await timeout(1000)

  root.render(
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {/* <React.StrictMode> */}
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistedStore}>
            <Router navigator={history} location={history.location}>
              <Routes>
                <Route path="register" element={<CreateAccountPage />} />
                <Route path="wallet" element={<WalletPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="demo" element={<DemoPage />} />

                <Route path="/*" element={<Navigate to="/register" />} />
              </Routes>
            </Router>

            <LoadingBar />
          </PersistGate>
        </Provider>
        {/* </React.StrictMode> */}
        <SnackbarUtilsConfigurator />
      </SnackbarProvider>
    </ThemeProvider>,
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
start()
