import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import {
  Lists,
  List,
  ListSlice,
  args,
  argsPost,
  argsUpdate,
  argsDelete,
} from 'types/list'
import { getLists, getList, createList, putList, deleteList } from 'api/list'
import { RootState } from 'store'

const initialState: ListSlice = {
  lists: [],
  isLoadingLists: false,
  hasErrorLists: false,
}

export const loadLists = createAsyncThunk(
  'list/getLists',
  async (userID: number) => getLists(userID),
)

export const loadList = createAsyncThunk(
  'list/getList',
  async (listID: number) => getList(listID),
)

export const updateList = createAsyncThunk(
  'list/updateList',
  async (args: args) => putList(args),
)

export const removeList = createAsyncThunk(
  'list/removeList',
  async (listID: number) => deleteList(listID),
)

export const addList = createAsyncThunk(
  'list/addList',
  async (args: argsPost) => createList(args),
)

export const list = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadLists.fulfilled, (state, action: PayloadAction<Lists>) => {
        if (action.payload.length < 1) {
          state.lists = []
        } else {
          state.lists = action.payload
        }
        state.isLoadingLists = false
        state.hasErrorLists = false
      })
      .addCase(loadLists.pending, state => {
        state.isLoadingLists = true
        state.hasErrorLists = false
      })
      .addCase(loadLists.rejected, state => {
        state.isLoadingLists = false
        state.hasErrorLists = true
      })
    //   BUG: ADD EXTRAREDUCER IN THE SLICE FOR ADDLIST, UPDATELIST, REMOVELIST + TEST
  },
})
