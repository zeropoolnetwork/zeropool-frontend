import { ActionType, createReducer } from 'typesafe-actions'

import { loadingBarActions } from 'shared/loading-bar/state/loading-bar.actions'

export interface LoadingBarState {
  requestsInProgress: number
}

export const initialState: LoadingBarState = {
  requestsInProgress: 0,
}

export const loadingBarReducer = createReducer<
  LoadingBarState,
  ActionType<typeof loadingBarActions>
>(initialState)
  .handleAction(
    loadingBarActions.addRequest,
    (state): LoadingBarState => ({
      requestsInProgress: state.requestsInProgress + 1,
    }),
  )
  .handleAction(
    loadingBarActions.removeRequest,
    (state): LoadingBarState => ({
      requestsInProgress: state.requestsInProgress - 1,
    }),
  )
