import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { argsDiscover, Discover, DiscoverSlice } from 'types/discover'
import { getDiscover } from 'api/getDiscover'
import { RootState } from 'store'

const initialState: DiscoverSlice = {
  discover: {},
  isLoadingDiscover: false,
  hasErrorDiscover: false,
}

export const loadDiscover = createAsyncThunk(
  'discover/getDiscover',
  async (args: argsDiscover) => getDiscover(args),
)

export const discover = createSlice({
  name: 'discover',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        loadDiscover.fulfilled,
        (state, action: PayloadAction<Discover>) => {
          state.discover = action.payload
          state.isLoadingDiscover = false
          state.hasErrorDiscover = false
        },
      )
      .addCase(loadDiscover.pending, state => {
        state.discover = initialState.discover
        state.isLoadingDiscover = true
        state.hasErrorDiscover = false
      })
      .addCase(loadDiscover.rejected, state => {
        state.discover = initialState.discover
        state.isLoadingDiscover = false
        state.hasErrorDiscover = true
      })
  },
})

export default discover.reducer

export const getDiscoverState = (state: RootState) => state.discover

export const getDiscoverSelector = createSelector(
  getDiscoverState,
  (slice: DiscoverSlice) => slice?.discover,
)

export const getDiscoverLoadingSelector = createSelector(
  getDiscoverState,
  (slice: DiscoverSlice) => slice?.isLoadingDiscover,
)

export const getDiscoverErrorSelector = createSelector(
  getDiscoverState,
  (slice: DiscoverSlice) => slice?.hasErrorDiscover,
)
