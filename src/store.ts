import { configureStore } from '@reduxjs/toolkit'
import genres from 'reducers/genres'
import credits from 'reducers/credits'
import creditdetails from 'reducers/creditdetails'
import configurations from 'reducers/configurations'
import external from 'reducers/external'
import trending from 'reducers/trending'
import find from 'reducers/find'
import discover from 'reducers/discover'
import account from 'reducers/account'
import user from 'reducers/user'
import list from 'reducers/list'
import movie from 'reducers/movie'

export const store = configureStore({
  reducer: {
    genres,
    credits,
    creditdetails,
    configurations,
    external,
    trending,
    find,
    discover,
    account,
    user,
    list,
    movie,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
