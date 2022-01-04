import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { args, External, ExternalSlice } from 'types/external'
import { getExternal } from 'api/getExternal'

const initialState: ExternalSlice = {
  external: {},
  isLoadingExternal: false,
  hasErrorExternal: false,
}

export const loadExternal = createAsyncThunk(
  'external/getExternal',
  async (args: args) => getExternal(args),
)

export const external = createSlice({
  name: 'external',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        loadExternal.fulfilled,
        (state, action: PayloadAction<External>) => {
          state.external = action.payload
          state.isLoadingExternal = false
          state.hasErrorExternal = false
        },
      )
      .addCase(loadExternal.pending, state => {
        state.external = initialState.external
        state.isLoadingExternal = true
        state.hasErrorExternal = false
      })
      .addCase(loadExternal.rejected, state => {
        state.external = initialState.external
        state.isLoadingExternal = false
        state.hasErrorExternal = true
      })
  },
})

export default external.reducer
