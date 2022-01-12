import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { Account, AccountSlice, UpdateAccount } from 'types/account'
import { getAccount } from 'api/getAccount'
import { RootState } from 'store'
import { deleteAccount } from 'api/deleteAccount'
import { putAccount } from 'api/putAccount'

const initialState: AccountSlice = {
  account: {},
  isLoadingAccount: false,
  hasErrorAccount: false,
  isLoadingDeleteAccount: false,
  hasErrorDeleteAccount: false,
}

export const loadAccount = createAsyncThunk('account/getAccount', async () =>
  getAccount(),
)

export const updateAccount = createAsyncThunk(
  'account/updateAccount',
  async (args: UpdateAccount) => putAccount(args),
)

export const removeAccount = createAsyncThunk(
  'account/removeAccount',
  async () => deleteAccount(),
)

export const account = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        loadAccount.fulfilled,
        (state, action: PayloadAction<Account>) => {
          state.account = action.payload
          state.isLoadingAccount = false
          state.hasErrorAccount = false
        },
      )
      .addCase(loadAccount.pending, state => {
        state.account = initialState.account
        state.isLoadingAccount = true
        state.hasErrorAccount = false
      })
      .addCase(loadAccount.rejected, state => {
        state.account = initialState.account
        state.isLoadingAccount = false
        state.hasErrorAccount = true
      })
      .addCase(removeAccount.fulfilled, state => {
        state.account = {}
        state.isLoadingDeleteAccount = false
        state.hasErrorDeleteAccount = false
      })
      .addCase(removeAccount.pending, state => {
        state.account = initialState.account
        state.isLoadingDeleteAccount = true
        state.hasErrorDeleteAccount = false
      })
      .addCase(removeAccount.rejected, state => {
        state.account = initialState.account
        state.isLoadingDeleteAccount = false
        state.hasErrorDeleteAccount = true
      })
  },
})

export default account.reducer

export const getAccountState = (state: RootState) => state.account

export const getAccountSelector = createSelector(
  getAccountState,
  (slice: AccountSlice) => slice?.account,
)

export const getAccountLoadingSelector = createSelector(
  getAccountState,
  (slice: AccountSlice) => slice?.isLoadingAccount,
)

export const getAccountErrorSelector = createSelector(
  getAccountState,
  (slice: AccountSlice) => slice?.hasErrorAccount,
)

export const getDeleteAccountLoadingSelector = createSelector(
  getAccountState,
  (slice: AccountSlice) => slice?.isLoadingDeleteAccount,
)

export const getDeleteAccountErrorSelector = createSelector(
  getAccountState,
  (slice: AccountSlice) => slice?.hasErrorDeleteAccount,
)
