import { ActionType, createReducer } from 'typesafe-actions';

import { wellcomePageActions } from 'wellcome/state/wellcome-page.actions';

export interface WellcomePageState {
  showBanner: boolean;
}

const initialState: WellcomePageState = {
  showBanner: true,
};

export const wellcomePageReducer = createReducer<
  WellcomePageState,
  ActionType<typeof wellcomePageActions>
>(initialState)
  .handleAction(wellcomePageActions.test1, state => ({
    ...state,
    showBanner: false,
  }))
  .handleAction(wellcomePageActions.test2, state => ({
    ...state,
    showBanner: true,
  }));
