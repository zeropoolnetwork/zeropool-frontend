import { loadingBarActions } from 'shared/loading-bar/state/loading-bar.actions';

describe('loadingBarActions actions', () => {
  it('should create an action addRequest of loadingBarActions', () => {
    const expectedAction = {
      type: '@loadingBar/addRequest',
    };
    expect(loadingBarActions.addRequest()).toEqual(expectedAction);
  });

  it('should create an action removeRequest of loadingBarActions', () => {
    const expectedAction = {
      type: '@loadingBar/removeRequest',
    };
    expect(loadingBarActions.removeRequest()).toEqual(expectedAction);
  });
});
