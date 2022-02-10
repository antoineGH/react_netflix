import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit'
import { args, TrendingSlice, Trendings } from 'types/trending'
import { getTrending } from 'api/getTrending'
import { RootState } from 'store'

const initialState: TrendingSlice = {
  trendings: [],
  isLoadingTrendings: false,
  hasErrorTrendings: false,
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
        (state, action: PayloadAction<Trendings>) => {
          if (action.payload.length < 1) {
            state.trendings = []
          } else {
            state.trendings = action.payload
          }
          state.isLoadingTrendings = false
          state.hasErrorTrendings = false
        },
      )
      .addCase(loadTrending.pending, state => {
        state.trendings = initialState.trendings
        state.isLoadingTrendings = true
        state.hasErrorTrendings = false
      })
      .addCase(loadTrending.rejected, state => {
        state.trendings = initialState.trendings
        state.isLoadingTrendings = false
        state.hasErrorTrendings = true
      })
  },
})

export default trending.reducer

export const getTrendingState = (state: RootState) => state.trending

export const getTrendingSelector = createSelector(
  getTrendingState,
  (slice: TrendingSlice) => slice?.trendings,
)

export const getTrendingLoadingSelector = createSelector(
  getTrendingState,
  (slice: TrendingSlice) => slice?.isLoadingTrendings,
)

export const getTrendingErrorSelector = createSelector(
  getTrendingState,
  (slice: TrendingSlice) => slice?.hasErrorTrendings,
)
