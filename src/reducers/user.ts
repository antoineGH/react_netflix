import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import {
  Users,
  User,
  UserSlice,
  args,
  argsPost,
  argsDelete,
  argsUpdate,
} from 'types/user'
import { getUsers, getUser, createUser, putUser, deleteUser } from 'api/user'
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

export const addUser = createAsyncThunk(
  'user/addUser',
  async (args: argsPost) => createUser(args),
)

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectUser: (state, { payload }: PayloadAction<number>) => {
      state.user = state.users.filter(user => user.user_id === payload)[0]
    },
    setErrorUpdate: state => {
      state.hasErrorUpdateUser = true
    },
    unsetErrorUpdate: state => {
      state.hasErrorUpdateUser = false
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadUsers.fulfilled, (state, action: PayloadAction<Users>) => {
        if (action.payload.length < 1) {
          state.users = []
        } else {
          state.users = action.payload
        }
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
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload
        state.users.push(action.payload)
        state.isLoadingUpdateUser = false
        state.hasErrorUpdateUser = false
      })
      .addCase(addUser.pending, state => {
        state.user = initialState.user
        state.isLoadingUpdateUser = true
        state.hasErrorUpdateUser = false
      })
      .addCase(addUser.rejected, state => {
        state.user = initialState.user
        state.isLoadingUpdateUser = false
        state.hasErrorUpdateUser = true
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<argsUpdate>) => {
          if (state.user === action.payload.json) {
            state.user = action.payload.json
          }
          const indexObject = state.users.findIndex(
            user => user.user_id === action.payload.userID,
          )
          state.users[indexObject] = action.payload.json
          state.isLoadingUpdateUser = false
          state.hasErrorUpdateUser = false
        },
      )
      .addCase(updateUser.pending, state => {
        state.isLoadingUpdateUser = true
        state.hasErrorUpdateUser = false
      })
      .addCase(updateUser.rejected, state => {
        state.isLoadingUpdateUser = false
        state.hasErrorUpdateUser = true
      })
      .addCase(
        removeUser.fulfilled,
        (state, action: PayloadAction<argsDelete>) => {
          state.users = state.users.filter(
            user => user.user_id !== action.payload.userID,
          )
          state.isLoadingDeleteUser = false
          state.hasErrorDeleteUser = false
        },
      )
      .addCase(removeUser.pending, state => {
        state.isLoadingDeleteUser = true
        state.hasErrorDeleteUser = false
      })
      .addCase(removeUser.rejected, state => {
        state.isLoadingDeleteUser = false
        state.hasErrorDeleteUser = true
      })
  },
})

export default user.reducer
export const { selectUser, unsetErrorUpdate, setErrorUpdate } = user.actions

export const getUserState = (state: RootState) => state.user

export const getUserSelector = createSelector(
  getUserState,
  (slice: UserSlice) => slice?.user,
)

export const getUserIDSelector = createSelector(
  getUserState,
  (slice: any) => slice?.user.user_id,
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
