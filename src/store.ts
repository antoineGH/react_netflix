import { configureStore } from '@reduxjs/toolkit'
import genres from 'reducers/genres'
import credits from 'reducers/credits'
import creditdetails from 'reducers/creditdetails'

export const store = configureStore({
  reducer: { genres, credits, creditdetails },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
