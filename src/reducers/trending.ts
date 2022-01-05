import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { args, TrendingSlice, Trending } from 'types/trending'
import { getTrending } from 'api/getTrending'

const initialState: TrendingSlice = {
  trending: {},
  isLoadingTrending: false,
  hasErrorTrending: false,
}

export const loadTrending = createAsyncThunk(
  'trending/getTrending',
  async (args: args) => getTrending(args),
)

export const trending = createSlice({
  name: 'trending',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        loadTrending.fulfilled,
        (state, action: PayloadAction<Trending>) => {
          state.trending = action.payload
          state.isLoadingTrending = false
          state.hasErrorTrending = false
        },
      )
      .addCase(loadTrending.pending, state => {
        state.trending = initialState.trending
        state.isLoadingTrending = true
        state.hasErrorTrending = false
      })
      .addCase(loadTrending.rejected, state => {
        state.trending = initialState.trending
        state.isLoadingTrending = false
        state.hasErrorTrending = true
      })
  },
})

export default trending.reducer
