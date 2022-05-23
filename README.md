# Important! How to run project:

## 1. Clone
- `git clone https://github.com/zeropoolnetwork/zeropool-frontend.git`

## 2. Init
In standalone terminal (use gitbush on Windows) run this commands from the root folder of the project:
- `./scripts/start-local` - start the app dev server

If blockchain node process halted remove it (from powershell if needed):

- netstat -ano | findstr :8545
- taskkill /PID [Process Id] /F 

# Developement 

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.<br />

## `npm run test:coverage`

Build the test coverage report.

## `npm run storybook`

Run Storybook. Currently broken due to using Alpha version of CRA5.

## `remixd -s ./deps/pool-evm-single-l1 --remix-ide https://remix.ethereum.org`

Connect to Remix IDE.

### Installing Remix and starting Remix IDE:

1) npm i -g remixd
2) Open https://remix.ethereum.org/ in the browser