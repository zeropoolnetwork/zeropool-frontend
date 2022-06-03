import { createSlice } from '@reduxjs/toolkit'

export type SharedState = {
    navigate: string | undefined
}

export const initialSharedState: SharedState = {
    navigate: undefined,
}

export const sharedSlice = createSlice({
    name: 'shared',
    initialState: initialSharedState,
    reducers: {}
})

