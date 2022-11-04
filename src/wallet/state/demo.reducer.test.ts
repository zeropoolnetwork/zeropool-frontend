import { demoSlice, initialDemoState } from 'wallet/state/demo.reducer';

describe('demo reducer', () => {
  it('handles setSeedAndPasword action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.setSeedAndPasword({ seed: 'seed', password: 'password', accountId: 'test' })
    )

    expect(newState.initials).toBeDefined()
    expect(newState.initials?.seed).toBe('seed')
    expect(newState.initials?.password).toBe('password')
  })

  it('handles initApi action', () => {

    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        backdrop: false,
        readiness: true,
        recovery: true,
        transferModal: true,
        minting: true,
        deposit: true,
        withdraw: true,
        transfer: true,
      },
      demoSlice.actions.initApi(null)
    )

    expect(newState.backdrop).toBe(true)
    expect(newState.readiness).toBe(false)
    expect(newState.recovery).toBe(false)
    expect(newState.transferModal).toBe(false)
    expect(newState.minting).toBe(false)
    expect(newState.deposit).toBe(false)
    expect(newState.withdraw).toBe(false)
    expect(newState.transfer).toBe(false)
  })

  it('handles initApiSuccess action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        backdrop: true,
        initials: { seed: 'seed', password: 'password', accountId: 'test' },
        readiness: false,
      },
      demoSlice.actions.initApiSuccess(null)
    )

    expect(newState.backdrop).toBe(false)
    expect(newState.initials).toBe(null)
    expect(newState.readiness).toBe(true)
  })

  it('handles initApiFailure action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        backdrop: true,
        initials: { seed: 'seed', password: 'password', accountId: 'test' },
      },
      demoSlice.actions.initApiFailure('error')
    )

    expect(newState.backdrop).toBe(false)
    expect(newState.initials).toBe(null)
  })

  it('handles updateBalance action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        publicBalance: 'publicBalance',
        privateBalance: 'privateBalance',
        tokenBalance: 'tokenBalance',
      },
      demoSlice.actions.updateBalances({ funds: 1, tokens: 1, private: 1 }),
    )

    expect(newState.publicBalance).toBeUndefined()
    expect(newState.privateBalance).toBeUndefined()
    expect(newState.tokenBalance).toBeUndefined()

  })

  it('handles updateBalancesFailure action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.updateBalancesFailure('error')
    )

    expect(newState).toEqual(initialDemoState)
  })

  it('handles publicBalance action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        publicBalance: 'publicBalance',
      },
      demoSlice.actions.publicBalance('newPublicBalance')
    )

    expect(newState.publicBalance).toBe('newPublicBalance')
  })

  it('handles privateBalance action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        privateBalance: 'privateBalance',
      },
      demoSlice.actions.privateBalance('newPrivateBalance')
    )

    expect(newState.privateBalance).toBe('newPrivateBalance')
  })

  it('handles tokenBalance action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        tokenBalance: 'tokenBalance',
      },
      demoSlice.actions.tokenBalance('newTokenBalance')
    )

    expect(newState.tokenBalance).toBe('newTokenBalance')
  })

  it('handles mint action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        minting: false,
      },
      demoSlice.actions.mint('Minting')
    )

    expect(newState.minting).toBe(true)
  })

  it('handles mintSuccess action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        minting: true,
      },
      demoSlice.actions.mintSuccess(1)
    )

    expect(newState.minting).toBe(false)
  })

  it('handles mintFailure action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        minting: true,
      },
      demoSlice.actions.mintFailure('error')
    )

    expect(newState.minting).toBe(false)
  })

  it('handles deposit action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        deposit: false,
      },
      demoSlice.actions.deposit('Deposit')
    )

    expect(newState.deposit).toBe(true)
  })

  it('handles depositSuccess action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        deposit: true,
      },
      demoSlice.actions.depositSuccess('Deposit')
    )

    expect(newState.deposit).toBe(false)
  })

  it('handles depositFailure action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        deposit: true,
      },
      demoSlice.actions.depositFailure('error')
    )

    expect(newState.deposit).toBe(false)
  })

  it('handles withdraw action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        withdraw: false,
      },
      demoSlice.actions.withdraw('Withdraw')
    )

    expect(newState.withdraw).toBe(true)
  })

  it('handles withdrawSuccess action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        withdraw: true,
      },
      demoSlice.actions.withdrawSuccess('Withdraw')
    )

    expect(newState.withdraw).toBe(false)
  })

  it('handles withdrawFailure action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        withdraw: true,
      },
      demoSlice.actions.withdrawFailure('error')
    )

    expect(newState.withdraw).toBe(false)
  })

  it('handles transfer action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        transfer: false,
      },
      demoSlice.actions.transfer({ id: 1, type: 'publicToPrivate', amount: '1', to: 'password' })
    )

    expect(newState.transfer).toBe(true)
  })

  it('handles transferSuccess action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        transfer: true,
      },
      demoSlice.actions.transferSuccess('Success')
    )

    expect(newState.transfer).toBe(false)
  })

  it('handles transferFailure action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        transfer: true,
      },
      demoSlice.actions.transferFailure('Error')
    )

    expect(newState.transfer).toBe(false)
  })

  it('handles resetAccount action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.resetAccount(null)
    )

    expect(newState).toEqual(initialDemoState)
  })

  it('handles recoverWallet action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        recovery: false,
        backdrop: true,
        readiness: false,
      },
      demoSlice.actions.recoverWallet('Recovering')
    )

    expect(newState.recovery).toBe(true)
    expect(newState.backdrop).toBe(false)
    expect(newState.readiness).toBe(true)
  })

  it('handles recoverWalletSuccess action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        recovery: true,
      },
      demoSlice.actions.recoverWalletSuccess({ seed: 'seed', password: 'password', accountId: 'test' })
    )

    expect(newState.recovery).toBe(false)
  })

  it('handles recoverWalletFailure action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.recoverWalletFailure('Error')
    )

    expect(newState).toEqual(initialDemoState)
  })

  it('handles getWlletAdress action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.getWalletAddress(null)
    )

    expect(newState).toEqual(initialDemoState)
  })

  it('handles getWalletAddressSuccess action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.getWalletAddressSuccess('address')
    )

    expect(newState.walletAddress).toBe('address')
  })

  it('handles getWalletAddressFailure action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.getWalletAddressFailure('Error')
    )

    expect(newState.walletAddress).toEqual('Cant get wallet address')
  })

  it('handles getPrivateAddress action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.getPrivateAddress(null)
    )

    expect(newState).toEqual(initialDemoState)
  })

  it('handles getPrivateAddressSuccess action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.getPrivateAddressSuccess('address')
    )

    expect(newState.privateAddress).toBe('address')
  })

  it('handles getPrivateAddressFailure action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.getPrivateAddressFailure('Error')
    )

    expect(newState.privateAddress).toEqual('Cant get private address')
  })

  it('handles getPrivateAddress action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.getPrivateAddress(null)
    )

    expect(newState).toEqual(initialDemoState)
  })

  it('handles getPrivateAddressSuccess action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.getPrivateAddressSuccess('address')
    )

    expect(newState.privateAddress).toBe('address')
  })

  it('handles getPrivateAddressFailure action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.getPrivateAddressFailure('Error')
    )

    expect(newState.privateAddress).toEqual('Cant get private address')
  })

  it('handles exportSeed action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.exportSeed('Exporting')
    )

    expect(newState).toEqual(initialDemoState)
  })

  it('handles exportSeedSuccess action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.exportSeedSuccess('Seed')
    )

    expect(newState).toEqual(initialDemoState)
  })

  it('handles exportSeedFailure action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.exportSeedFailure('Error')
    )

    expect(newState).toEqual(initialDemoState)
  })

  it('handles transferModal action', () => {
    const newState = demoSlice.reducer(
      {
        ...initialDemoState,
        transferModal: false
      },
      demoSlice.actions.transferModal(true)
    )

    expect(newState.transferModal).toBe(true)
  })

  it('handles transaction action', () => {
    const newState = demoSlice.reducer(
      initialDemoState,
      demoSlice.actions.transaction({ status: 'pending', type: 'mint', amount: '100', to: 'test', from: 'test', timestamp: 0 }),
    )

    expect(newState.transactionStatus).toBe('pending')
  })
})