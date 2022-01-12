import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { Users, User, UserSlice, args } from 'types/user'
import { getUsers } from 'api/getUsers'
import { getUser } from 'api/getUser'
import { createUser } from 'api/postUser'
import { putUser } from 'api/putUser'
import { deleteUser } from 'api/deleteUser'
import { RootState } from 'store'

const initialState: UserSlice = {
  user: {},
  users: [],
  isLoadingUser: false,
  hasErrorUser: false,
  isLoadingUsers: false,
  hasErrorUsers: false,
  isLoadingAddUser: false,
  hasErrorAddUser: false,
  isLoadingDeleteUser: false,
  hasErrorDeleteUser: false,
  isLoadingUpdateUser: false,
  hasErrorUpdateUser: false,
}

export const loadUsers = createAsyncThunk('user/getUsers', async () =>
  getUsers(),
)
export const loadUser = createAsyncThunk(
  'user/getUser',
  async (userID: number) => getUser(userID),
)
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (args: args) => putUser(args),
)
export const removeUser = createAsyncThunk(
  'user/removeUser',
  async (userID: number) => deleteUser(userID),
)

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.fulfilled, (state, action: PayloadAction<Users>) => {
        state.users = action.payload
        state.isLoadingUsers = false
        state.hasErrorUsers = false
      })
      .addCase(loadUsers.pending, state => {
        state.users = initialState.users
        state.isLoadingUsers = true
        state.hasErrorUsers = false
      })
      .addCase(loadUsers.rejected, state => {
        state.users = initialState.users
        state.isLoadingUsers = false
        state.hasErrorUsers = true
      })
      .addCase(loadUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload
        state.isLoadingUser = false
        state.hasErrorUser = false
      })
      .addCase(loadUser.pending, state => {
        state.user = initialState.user
        state.isLoadingUser = true
        state.hasErrorUser = false
      })
      .addCase(loadUser.rejected, state => {
        state.user = initialState.user
        state.isLoadingUser = false
        state.hasErrorUser = true
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload
        state.isLoadingUpdateUser = false
        state.hasErrorUpdateUser = false
      })
      .addCase(updateUser.pending, state => {
        state.user = initialState.user
        state.isLoadingUpdateUser = true
        state.hasErrorUpdateUser = false
      })
      .addCase(updateUser.rejected, state => {
        state.user = initialState.user
        state.isLoadingUpdateUser = false
        state.hasErrorUpdateUser = true
      })
      .addCase(removeUser.fulfilled, state => {
        state.user = {}
        state.isLoadingDeleteUser = false
        state.hasErrorDeleteUser = false
      })
      .addCase(removeUser.pending, state => {
        state.user = initialState.user
        state.isLoadingDeleteUser = true
        state.hasErrorDeleteUser = false
      })
      .addCase(removeUser.rejected, state => {
        state.user = initialState.user
        state.isLoadingDeleteUser = false
        state.hasErrorDeleteUser = true
      })
  },
})

export default user.reducer

export const getUserState = (state: RootState) => state.user

export const getUserSelector = createSelector(
  getUserState,
  (slice: UserSlice) => slice?.user,
)

export const getUserLoadingSelector = createSelector(
  getUserState,
  (slice: UserSlice) => slice?.isLoadingUser,
)

export const getUserErrorSelector = createSelector(
  getUserState,
  (slice: UserSlice) => slice?.hasErrorUser,
)
export const getUsersSelector = createSelector(
  getUserState,
  (slice: UserSlice) => slice?.users,
)

export const getUsersLoadingSelector = createSelector(
  getUserState,
  (slice: UserSlice) => slice?.isLoadingUsers,
)

export const getUsersErrorSelector = createSelector(
  getUserState,
  (slice: UserSlice) => slice?.hasErrorUsers,
)
export const updateUserLoadingSelector = createSelector(
  getUserState,
  (slice: UserSlice) => slice?.isLoadingUpdateUser,
)

export const updateUserErrorSelector = createSelector(
  getUserState,
  (slice: UserSlice) => slice?.hasErrorUpdateUser,
)

export const deleteUserLoadingSelector = createSelector(
  getUserState,
  (slice: UserSlice) => slice?.isLoadingDeleteUser,
)

export const deleteUserErrorSelector = createSelector(
  getUserState,
  (slice: UserSlice) => slice?.hasErrorDeleteUser,
)