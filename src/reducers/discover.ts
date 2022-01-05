import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { argsDiscover, Discover, DiscoverSlice } from 'types/discover'
import { getDiscover } from 'api/getDiscover'

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
