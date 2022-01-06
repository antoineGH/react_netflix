import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { Find, FindQuery, FindSlice, args } from 'types/find'
import { getFindID, getFindQuery } from 'api/getFind'
import { RootState } from 'store'

const initialState: FindSlice = {
  findID: {},
  isLoadingfindID: false,
  hasErrorfindID: false,
  findQuery: {},
  isLoadingfindQuery: false,
  hasErrorfindQuery: false,
}

export const loadFindID = createAsyncThunk(
  'find/getFindID',
  async (args: args) => getFindID(args),
)

export const loadFindQuery = createAsyncThunk(
  'find/getFindQuery',
  async (args: args) => getFindQuery(args),
)

export const find = createSlice({
  name: 'find',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadFindID.fulfilled, (state, action: PayloadAction<Find>) => {
        state.findID = action.payload
        state.isLoadingfindID = false
        state.hasErrorfindID = false
      })
      .addCase(loadFindID.pending, state => {
        state.findID = initialState.findID
        state.isLoadingfindID = true
        state.hasErrorfindID = false
      })
      .addCase(loadFindID.rejected, state => {
        state.findQuery = initialState.findQuery
        state.isLoadingfindQuery = false
        state.hasErrorfindQuery = true
      })
      .addCase(
        loadFindQuery.fulfilled,
        (state, action: PayloadAction<FindQuery>) => {
          state.findQuery = action.payload
          state.isLoadingfindQuery = false
          state.hasErrorfindQuery = false
        },
      )
      .addCase(loadFindQuery.pending, state => {
        state.findQuery = initialState.findQuery
        state.isLoadingfindQuery = true
        state.hasErrorfindQuery = false
      })
      .addCase(loadFindQuery.rejected, state => {
        state.findID = initialState.findID
        state.isLoadingfindID = false
        state.hasErrorfindID = true
      })
  },
})

export default find.reducer

export const getFindState = (state: RootState) => state.find

export const getFindIDSelector = createSelector(
  getFindState,
  (slice: FindSlice) => slice?.findID,
)
export const getFindIDLoadingSelector = createSelector(
  getFindState,
  (slice: FindSlice) => slice?.isLoadingfindID,
)
export const getFindIDErrorSelector = createSelector(
  getFindState,
  (slice: FindSlice) => slice?.hasErrorfindID,
)

export const getFindQuerySelector = createSelector(
  getFindState,
  (slice: FindSlice) => slice?.findQuery,
)
export const getFindQueryLoadingSelector = createSelector(
  getFindState,
  (slice: FindSlice) => slice?.isLoadingfindQuery,
)
export const getFindQueryErrorSelector = createSelector(
  getFindState,
  (slice: FindSlice) => slice?.hasErrorfindQuery,
)
