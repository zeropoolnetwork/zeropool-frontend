import { ActionType, createReducer } from 'typesafe-actions';

import { welcomePageActions } from 'welcome/state/welcome-page.actions';

export interface WelcomePageState {
  showBanner: boolean;
}

const initialState: WelcomePageState = {
  showBanner: true,
};

export const welcomePageReducer = createReducer<
  WelcomePageState,
  ActionType<typeof welcomePageActions>
>(initialState)
  .handleAction(welcomePageActions.test1, state => ({
    ...state,
    showBanner: false,
  }))
  .handleAction(welcomePageActions.test2, state => ({
    ...state,
    showBanner: true,
  }));
