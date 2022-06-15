<!-- # Important! How to run project:

## 1. Clone
- `git clone https://github.com/zeropoolnetwork/zeropool-frontend.git`

## 2. Init
In standalone terminal (use gitbush on Windows) run this commands from the root folder of the project:
- `./scripts/start-local` - start the app dev server

If blockchain node process halted remove it (from powershell if needed):

- netstat -ano | findstr :8545
- taskkill /PID [Process Id] /F  -->

# Developement 

In the project directory, you can run the following commands:

## `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## `yarn test:debug`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.<br />

## `yarn test`

Build the test coverage report.

## `yarn coverage`

Runs local server to show test coverage report.

## `yarn build:local`

Build the app to be tested on localhost.
Then you can run the app (in VSCode):
- install LiveServer plugin
- open build/index.html in the VS Code editor
- click on Live Server icon in the lower right corner

## `yarn deploy`

We use this command to deploy the app to our Github Pages.

<!-- ## `remixd -s ./deps/pool-evm-single-l1 --remix-ide https://remix.ethereum.org`

Connect to Remix IDE.

### Installing Remix and starting Remix IDE:

1) npm i -g remixd
2) Open https://remix.ethereum.org/ in the browser -->