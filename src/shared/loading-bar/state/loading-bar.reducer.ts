import { createSlice } from '@reduxjs/toolkit'

export interface LoadingBarState {
  requestsInProgress: number
}

export const initialLoadingBarState: LoadingBarState = {
  requestsInProgress: 0,
}

export const loadingBarSlice = createSlice({
  name: 'loadingBar',
  initialState: initialLoadingBarState,
  reducers: {
    addRequest: (state) => {
      state.requestsInProgress = state.requestsInProgress + 1
    },
    removeRequest: (state) => {
      state.requestsInProgress = state.requestsInProgress - 1
    },
  },
})

export const loadingBarActions = loadingBarSlice.actions
export const loadingBarReducer = loadingBarSlice.reducer
