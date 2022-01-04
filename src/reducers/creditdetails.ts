import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
  CreditDetails,
  creditID,
  CreditDetailsSlice,
} from 'types/creditdetails'
import { getCreditDetails } from 'api/getCreditDetails'

const initialState: CreditDetailsSlice = {
  creditDetails: {},
  isLoadingCreditDetails: false,
  hasErrorCreditDetails: false,
}

export const loadCreditDetails = createAsyncThunk(
  'creditdetails/getCreditDetails',
  async (creditID: creditID) => getCreditDetails(creditID),
)

export const creditdetails = createSlice({
  name: 'creditdetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        loadCreditDetails.fulfilled,
        (state, action: PayloadAction<CreditDetails>) => {
          state.creditDetails = action.payload
          state.isLoadingCreditDetails = false
          state.hasErrorCreditDetails = false
        },
      )
      .addCase(loadCreditDetails.pending, state => {
        state.creditDetails = initialState.creditDetails
        state.isLoadingCreditDetails = true
        state.hasErrorCreditDetails = false
      })
      .addCase(loadCreditDetails.rejected, state => {
        state.creditDetails = initialState.creditDetails
        state.isLoadingCreditDetails = false
        state.hasErrorCreditDetails = true
      })
  },
})

export default creditdetails.reducer
