import { configureStore } from '@reduxjs/toolkit'
import genres from 'reducers/genres'

export const store = configureStore({
  reducer: { genres },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
