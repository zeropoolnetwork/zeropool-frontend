import { loadingBarReducer } from 'shared/loading-bar/state/loading-bar.reducer'

import { loadingBarActions } from 'shared/loading-bar/state/loading-bar.actions'

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
    expect(loadingBarReducer(initialState, loadingBarActions.addRequest())).toEqual({
      requestsInProgress: 1,
    })
  })

  it('properly handles the removeRequest of loadingBar', () => {
    expect(loadingBarReducer(initialState, loadingBarActions.removeRequest())).toEqual({
      requestsInProgress: -1,
    })
  })
})
