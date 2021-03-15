import { of } from 'rxjs'
import { takeSelector } from './take-selector.operator'

describe('takeSelector operator', () => {
  it('should switch to result of selector applied to given state', () => {
    const trigger = 'trigger'
    const state = { test: 'test' }
    const selector = (s: typeof state) => s.test
    const handler = jest.fn()

    of(trigger)
      .pipe(takeSelector(of(state), selector))
      .subscribe(handler)

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith('test')
  })
})
