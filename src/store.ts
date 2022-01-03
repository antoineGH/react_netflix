import { configureStore } from '@reduxjs/toolkit'
import genres from 'reducers/genres'
import credits from 'reducers/credits'

export const store = configureStore({
  reducer: { genres, credits },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
