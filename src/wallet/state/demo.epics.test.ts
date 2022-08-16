import { from } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { TransferType } from 'shared/models'
import { deposit } from 'wallet/api/zeropool.api'
import { Transaction } from 'wallet/components/Transaction/Transaction'
import { demoEpics } from 'wallet/state/demo.epics'
import { demoActions, initialDemoState } from 'wallet/state/demo.reducer'

const fromMock = from as jest.Mock

var mockApiDeposit = jest.fn()
var mockApiWithdraw = jest.fn()
var mockApiTransfer = jest.fn()
var mockToastInfo = jest.fn()
var mockToastClose = jest.fn()
var mockToastSuccess = jest.fn()
var mockToastError = jest.fn()

jest.mock('wallet/api/zeropool.api', () => ({
   init: jest.fn(),
   mint: jest.fn(),
   deposit: () => mockApiDeposit(),
   withdraw: () => mockApiWithdraw(),
   transfer: () => mockApiTransfer(),
   getDevSeed: jest.fn(),
   getDevPassword: jest.fn(),
}))
jest.mock('shared/helpers/toast.helper', () => ({
   toast: {
      info: (...args: any) => mockToastInfo(...args),
      close: (id: string) => mockToastClose(id),
      success: (msg: string) => mockToastSuccess(msg),
      error: (errMsg: string) => mockToastError(errMsg),
   },
}))
jest.mock('rxjs', () => ({
   ...jest.requireActual('rxjs'),
   from: jest.fn(),
}))

describe('demoEpics', () => {
   afterEach(() => {
      jest.clearAllMocks()
   })
   describe('initApi', () => {
      it('should dispath initApiSuccess action', () => {
         const testSheduler = new TestScheduler((actual, expected) => {
            expect(actual).toStrictEqual(expected)
            expect(mockToastInfo).toHaveBeenCalledTimes(1)
            expect(mockToastInfo).toHaveBeenCalledWith(expect.anything(), { key: 'initApi', persist: true })
            expect(mockToastClose).toHaveBeenCalledTimes(1)
            expect(mockToastClose).toHaveBeenCalledWith('initApi')
            expect(mockToastSuccess).toHaveBeenCalledTimes(1)
            expect(mockToastSuccess).toHaveBeenCalledWith('Wallet initialized')
         })

         testSheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', { a: demoActions.initApi(null) })
            const state$ = cold('a', { a: { demo: { ...initialDemoState, initials: { seed: 'seed', password: 'password' } } } }) as any
            const expected$ = hot('-b', { b: demoActions.initApiSuccess(null) })
            const result$ = demoEpics(action$, state$, {})

            fromMock.mockReturnValue(hot('-a', { a: null }))

            expectObservable(result$).toEqual(expected$)
         })
      })

      it('should dispath initApiFailure action', () => {
         const testSheduler = new TestScheduler((actual, expected) => {
            expect(actual).toStrictEqual(expected)
            expect(mockToastClose).toHaveBeenCalledTimes(1)
            expect(mockToastClose).toHaveBeenCalledWith('initApi')
            expect(mockToastError).toHaveBeenCalledTimes(1)
            expect(mockToastError).toHaveBeenCalledWith('Api init failure')
         })

         testSheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', { a: demoActions.initApi(null) })
            const state$ = cold('a', { a: { demo: { ...initialDemoState, initials: { seed: 'seed', password: 'password' } } } }) as any
            const expected$ = hot('-b', { b: demoActions.initApiFailure('Api init failure') })
            const result$ = demoEpics(action$, state$, {})

            fromMock.mockReturnValue(hot('-#', {}, 'Api init failure'))

            expectObservable(result$).toEqual(expected$)
         })
      })
   })

   describe('mint', () => {
      it('should dispatch mintSuccess when mint succeeds', () => {
         const testSheduler = new TestScheduler((actual, expected) => {
            expect(actual).toStrictEqual(expected)
            expect(mockToastInfo).toHaveBeenCalledTimes(1)
            expect(mockToastInfo).toHaveBeenCalledWith(expect.anything(), { key: 'mint', persist: true })
            expect(mockToastClose).toHaveBeenCalledTimes(1)
            expect(mockToastClose).toHaveBeenCalledWith('mint')
            expect(mockToastSuccess).toHaveBeenCalledTimes(1)
            expect(mockToastSuccess).toHaveBeenCalledWith('Mint success')
            expect(mockToastError).toHaveBeenCalledTimes(0)
         })

         testSheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', { a: demoActions.mint('1') })
            const state$ = cold('b', { b: { demo: { ...initialDemoState } } }) as any
            const result$ = demoEpics(action$, state$, {})

            fromMock.mockImplementation(() => cold('-a', { a: { name: 'Max' } }))

            expectObservable(result$).toBe('--a', { a: demoActions.mintSuccess(1) })
         })
      })

      it('should dispatch mintFailure when mint fails', () => {
         const testSheduler = new TestScheduler((actual, expected) => {
            expect(actual).toStrictEqual(expected)
            expect(mockToastInfo).toHaveBeenCalledTimes(1)
            expect(mockToastInfo).toHaveBeenCalledWith(expect.anything(), { key: 'mint', persist: true })
            expect(mockToastClose).toHaveBeenCalledTimes(1)
            expect(mockToastClose).toHaveBeenCalledWith('mint')
            expect(mockToastSuccess).toHaveBeenCalledTimes(0)
            expect(mockToastError).toHaveBeenCalledTimes(1)
            expect(mockToastError).toHaveBeenCalledWith('Mint Failed')
         })

         testSheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', { a: demoActions.mint('1') })
            const state$ = cold('b', { b: { demo: { ...initialDemoState } } }) as any
            const result$ = demoEpics(action$, state$, {})

            fromMock.mockImplementation(() => cold('-#', {}, 'Mint Failed'))

            expectObservable(result$).toBe('--a', { a: demoActions.mintFailure('Mint Failed') })
         })
      })
   })

   describe('deposit', () => {
      it('should dispatch transaction when deposit started', () => {
         const testSheduler = new TestScheduler((actual, expected) => {
            expect(actual).toStrictEqual(expected)
            expect(mockToastInfo).toHaveBeenCalledTimes(1)
            expect(mockToastInfo).toHaveBeenCalledWith(expect.anything(), { key: 'deposit', persist: true })
         })

         testSheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', { a: demoActions.deposit('1') })
            const state$ = cold('b', { b: { demo: { ...initialDemoState } } }) as any
            const result$ = demoEpics(action$, state$, {})

            mockApiDeposit.mockReturnValue(cold('-a', { a: { status: 'started', type: 'deposit' } }))

            expectObservable(result$).toBe('--a', { a: demoActions.transaction({ status: 'started', type: 'deposit' }) })
         })
      })
      it('should dispatch transaction when deposit pending', () => {
         const testSheduler = new TestScheduler((actual, expected) => {
            expect(actual).toStrictEqual(expected)
            expect(mockToastClose).toHaveBeenCalledTimes(1)
            expect(mockToastClose).toHaveBeenCalledWith('deposit')
            expect(mockToastSuccess).toHaveBeenCalledTimes(1)
            expect(mockToastSuccess).toHaveBeenCalledWith('Deposit success')
         })

         testSheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', { a: demoActions.deposit('1') })
            const state$ = cold('b', { b: { demo: { ...initialDemoState } } }) as any
            const result$ = demoEpics(action$, state$, {})
            const expected$ = hot('--a', { a: demoActions.transaction({ status: 'pending', type: 'deposit' }) })

            mockApiDeposit.mockReturnValue(cold('-a', { a: { status: 'pending', type: 'deposit' } }))

            expectObservable(result$).toEqual(expected$)
         })
      })

      it('should dispatch transaction and depositSuccess when deposit success', () => {
         const testSheduler = new TestScheduler((actual, expected) => {
            expect(actual).toStrictEqual(expected)
            expect(mockToastClose).toHaveBeenCalledTimes(1)
            expect(mockToastClose).toHaveBeenCalledWith('deposit')
         }).run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', { a: demoActions.deposit('1') })
            const state$ = cold('b', { b: { demo: { ...initialDemoState } } }) as any
            const result$ = demoEpics(action$, state$, {})
            const expected$ = hot('--(ab)', {
               a: demoActions.transaction({ status: 'success', type: 'deposit' }),
               b: demoActions.depositSuccess('1')
            })

            mockApiDeposit.mockReturnValue(cold('-a', { a: { status: 'success', type: 'deposit' } }))

            expectObservable(result$).toEqual(expected$)
         })
      })

      it('should dispatch depositFailure when deposit fails', () => {
         const testSheduler = new TestScheduler((actual, expected) => {
            expect(actual).toStrictEqual(expected)
            expect(mockToastError).toHaveBeenCalledTimes(1)
            expect(mockToastError).toHaveBeenCalledWith('Transaction failed')
         }).run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', { a: demoActions.deposit('1') })
            const state$ = cold('b', { b: { demo: { ...initialDemoState } } }) as any
            const result$ = demoEpics(action$, state$, {})
            const expected$ = hot('--a', { a: demoActions.depositFailure('Transaction failed') })

            mockApiDeposit.mockReturnValue(cold('-#', {}, 'Transaction failed'))

            expectObservable(result$).toEqual(expected$)
         })
      })
   })

   describe('withdraw', () => {
      it('should dispatch transaction when withdraw started', () => {
         const testSheduler = new TestScheduler((actual, expected) => {
            expect(actual).toStrictEqual(expected)
            expect(mockToastInfo).toHaveBeenCalledTimes(1)
            expect(mockToastInfo).toHaveBeenCalledWith(expect.anything(), { key: 'withdraw', persist: true })
         }).run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', { a: demoActions.withdraw('1') })
            const state$ = cold('b', { b: { demo: { ...initialDemoState } } }) as any
            const result$ = demoEpics(action$, state$, {})
            const expected$ = hot('--a', { a: demoActions.transaction({ status: 'started', type: 'withdraw' }) })

            mockApiWithdraw.mockReturnValue(cold('-a', { a: { status: 'started', type: 'withdraw' } }))

            expectObservable(result$).toEqual(expected$)
         })
      })

      it('should dispatch transaction when withdraw pending', () => {
         const testSheduler = new TestScheduler((actual, expected) => {
            expect(actual).toStrictEqual(expected)
            expect(mockToastClose).toHaveBeenCalledTimes(1)
            expect(mockToastClose).toHaveBeenCalledWith('withdraw')
            expect(mockToastSuccess).toHaveBeenCalledTimes(1)
            expect(mockToastSuccess).toHaveBeenCalledWith('Withdraw success')
         }).run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', { a: demoActions.withdraw('1') })
            const state$ = cold('b', { b: { demo: { ...initialDemoState } } }) as any
            const result$ = demoEpics(action$, state$, {})
            const expected$ = hot('--a', { a: demoActions.transaction({ status: 'pending', type: 'withdraw' }) })

            mockApiWithdraw.mockReturnValue(cold('-a', { a: { status: 'pending', type: 'withdraw' } }))

            expectObservable(result$).toEqual(expected$)
         })
      })

      it('should dispatch transaction and withdrawSuccess when withdraw success', () => {
         const testSheduler = new TestScheduler((actual, expected) => {
            expect(actual).toStrictEqual(expected)
            expect(mockToastSuccess).toHaveBeenCalledTimes(1)
            expect(mockToastSuccess).toHaveBeenCalledWith('Withdraw confirmed')
         }).run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', { a: demoActions.withdraw('1') })
            const state$ = cold('b', { b: { demo: { ...initialDemoState } } }) as any
            const result$ = demoEpics(action$, state$, {})
            const expected$ = hot('--(ab)', {
               a: demoActions.transaction({ status: 'success', type: 'withdraw' }),
               b: demoActions.withdrawSuccess('1')
            })

            mockApiWithdraw.mockReturnValue(cold('-a', { a: { status: 'success', type: 'withdraw' } }))

            expectObservable(result$).toEqual(expected$)
         })
      })

      it('should dispatch withdrawFailure when withdraw fails', () => {
         const testSheduler = new TestScheduler((actual, expected) => {
            expect(actual).toStrictEqual(expected)
            expect(mockToastError).toHaveBeenCalledTimes(1)
            expect(mockToastError).toHaveBeenCalledWith('Transaction failed')
         }).run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', { a: demoActions.withdraw('1') })
            const state$ = cold('b', { b: { demo: { ...initialDemoState } } }) as any
            const result$ = demoEpics(action$, state$, {})
            const expected$ = hot('--a', { a: demoActions.withdrawFailure('Transaction failed') })

            mockApiWithdraw.mockReturnValue(cold('-#', {}, 'Transaction failed'))

            expectObservable(result$).toEqual(expected$)
         })
      })
   })

   describe('transfer', () => {
      it('should dispatch transaction when transfer started', () => {
         new TestScheduler((actual, expected) => {
            expect(actual).toStrictEqual(expected)
            expect(mockToastInfo).toHaveBeenCalledTimes(1)
            expect(mockToastInfo).toHaveBeenCalledWith(expect.anything(), { key: 'transfer', persist: true })
         }).run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', {
               a: demoActions.transfer({
                  to: 'to',
                  amount: 'amount',
                  id: 1,
                  type: 'funds'
               })
            })
            const state$ = cold('b', { b: { demo: { ...initialDemoState } } }) as any
            const result$ = demoEpics(action$, state$, {})
            const expected$ = hot('--a', { a: demoActions.transaction({ status: 'started', type: 'funds' }) })

            mockApiTransfer.mockReturnValue(cold('-a', { a: { status: 'started', type: 'funds' } }))

            expectObservable(result$).toEqual(expected$)
         })
      })
   })

})