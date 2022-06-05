import { loadingBarActions as actions } from 'shared/loading-bar/state/loading-bar.reducer'

describe('loadingBarActions actions', () => {
  it('should create an action addRequest of loadingBarActions', () => {
    const expectedAction = {
      type: '@loadingBar/addRequest',
    }
    expect(actions.addRequest()).toEqual(expectedAction)
  })

  it('should create an action removeRequest of loadingBarActions', () => {
    const expectedAction = {
      type: '@loadingBar/removeRequest',
    }
    expect(actions.removeRequest()).toEqual(expectedAction)
  })
})
