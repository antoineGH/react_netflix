import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Find, FindQuery, FindSlice, args } from 'types/find'
import { getFindID, getFindQuery } from 'api/getFind'

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
