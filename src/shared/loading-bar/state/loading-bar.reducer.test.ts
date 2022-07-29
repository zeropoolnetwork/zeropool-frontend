// tslint:disable-next-line: prettier
import { loadingBarActions as actions, loadingBarReducer as reducer } from 'shared/loading-bar/state/loading-bar.reducer'

export interface LoadingBarState {
  requestsInProgress: number
}

let initialState: LoadingBarState = {
  requestsInProgress: 0,
}

describe('loading bar Reducers', () => {
  beforeEach(() => {
    initialState = {
      requestsInProgress: 0,
    }
  })

  it('properly handles the addRequest of loadingBar', () => {
    expect(reducer(initialState, actions.addRequest())).toEqual({
      requestsInProgress: 1,
    })
  })

  it('properly handles the removeRequest of loadingBar', () => {
    expect(reducer(initialState, actions.removeRequest())).toEqual({
      requestsInProgress: -1,
    })
  })
})
