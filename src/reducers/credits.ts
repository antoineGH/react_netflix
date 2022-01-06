import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { Credits, CreditSlice, args } from 'types/credit'
import { getCredits } from 'api/getCredits'
import { RootState } from 'store'

const initialState: CreditSlice = {
  credits: [],
  isLoadingCredit: false,
  hasErrorCredit: false,
}

export const loadCredits = createAsyncThunk(
  'credits/getCredits',
  async (args: args) => getCredits(args),
)

export const credits = createSlice({
  name: 'credits',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        loadCredits.fulfilled,
        (state, action: PayloadAction<Credits>) => {
          state.credits = action.payload
          state.isLoadingCredit = false
          state.hasErrorCredit = false
        },
      )
      .addCase(loadCredits.pending, state => {
        state.credits = initialState.credits
        state.isLoadingCredit = true
        state.hasErrorCredit = false
      })
      .addCase(loadCredits.rejected, state => {
        state.credits = initialState.credits
        state.isLoadingCredit = false
        state.hasErrorCredit = true
      })
  },
})

export default credits.reducer

export const getCreditsState = (state: RootState) => state.credits

export const getCreditsSelector = createSelector(
  getCreditsState,
  (slice: CreditSlice) => slice?.credits,
)

export const getCreditsLoadingSelector = createSelector(
  getCreditsState,
  (slice: CreditSlice) => slice?.isLoadingCredit,
)

export const getCreditsErrorSelector = createSelector(
  getCreditsState,
  (slice: CreditSlice) => slice?.hasErrorCredit,
)
