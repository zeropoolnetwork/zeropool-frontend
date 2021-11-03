# Important! How to run project:

## 1. Clone
- `git clone --recurse-submodules https://github.com/zeropoolnetwork/zeropool-console.git`

If you forget to use '--recurse-submodules' flag, then try to use 'git submodule update --init --recursive' command after cloning repository.

## 2. Init
In standalone terminal run this commands from the root folder of the project:
- `./scripts/build-deps` - to build parameters and contracts
- `./scripts/start-node` - start a hardhat node
- `./scripts/start-local` - start the app dev server

If blockchain node process halted remove it (from powershell if needed):

- netstat -ano | findstr :8545
- taskkill /PID [Process Id] /F 

# Available Scripts

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
