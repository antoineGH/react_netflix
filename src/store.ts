import { configureStore } from '@reduxjs/toolkit'
import genres from 'reducers/genres'
import credits from 'reducers/credits'
import creditdetails from 'reducers/creditdetails'
import configurations from 'reducers/configurations'
import external from 'reducers/external'

export const store = configureStore({
  reducer: { genres, credits, creditdetails, configurations, external },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
