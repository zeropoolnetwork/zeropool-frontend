# Zero Pool Wallet

version: 0.23.10

## Supported networks

- [Sepolia](https://testnet.app.zeropool.network/)
- [Near](https://near.testnet.frontend.v2.zeropool.network/)
- [Waves](https://waves.testnet.console.v2.zeropool.network/) (console only)
- [Substrate](https://substrate.testnet.console.v2.zeropool.network/) (console only)

# Developement

First of all, in the project directory create static/assets/ folder and put there respective static files from [this repo](https://github.com/zeropoolnetwork/zeropool-frontend-static.git)

Then in the project directory select the network you want to work with:

### Near:

##### `mklink .env .env.near` - Windows command prompt as admin

##### `ln -s .env.near .env` - Linux

### Sepolia:

##### `mklink .env .env.sepolia` - Windows command prompt as admin

##### `ln -s .env.sepolia .env` - Linux

After that you can run the following commands:

## `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## `yarn test:debug`

Launches the test runner in the interactive watch mode.

## `yarn test:debug [part_of_the_file_name]`

Launches the test runner in the interactive watch mode for the specified file(-s).

## `yarn test`

Build the test coverage report.

## `yarn coverage`

Runs local server to show test coverage report.

## Known issues

### `yarn start` builds the app with outdated dependencies

`rm -rf node_modules/.cache/` and then `yarn start` again
If it doesn't help, try to remove `node_modules` folder and run `yarn install` again.
