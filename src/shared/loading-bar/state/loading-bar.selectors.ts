import { createSelector } from 'reselect'

import { RootState } from 'state'

const getLoadingBarState = (state: RootState) => state.shared.loadingBar

const getActiveRequestCount = createSelector(
  getLoadingBarState,
  (state) => state.requestsInProgress,
)

export const showLoadingBar = createSelector(
  getActiveRequestCount,
  (activeRequests) => activeRequests > 0,
)
