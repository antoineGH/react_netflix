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
  list: {},
  isLoadingList: false,
  hasErrorList: false,
  isLoadingAddList: false,
  hasErrorAddList: false,
  isLoadingUpdateList: false,
  hasErrorUpdateList: false,
  isLoadingDeleteList: false,
  hasErrorDeleteList: false,
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
  reducers: {
    selectList: (state, { payload }: PayloadAction<number>) => {
      state.list = state.lists.filter(list => list.list_id === payload)[0]
    },
  },
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
      .addCase(loadList.fulfilled, (state, action: PayloadAction<List>) => {
        state.list = action.payload
        state.isLoadingList = false
        state.hasErrorList = false
      })
      .addCase(loadList.pending, state => {
        state.isLoadingList = true
        state.hasErrorList = false
      })
      .addCase(loadList.rejected, state => {
        state.isLoadingList = false
        state.hasErrorList = true
      })
      .addCase(addList.fulfilled, (state, action: PayloadAction<List>) => {
        state.list = action.payload
        state.lists.push(action.payload)
        state.isLoadingAddList = false
        state.hasErrorAddList = false
      })
      .addCase(addList.pending, state => {
        state.isLoadingAddList = true
        state.hasErrorAddList = false
      })
      .addCase(addList.rejected, state => {
        state.isLoadingAddList = false
        state.hasErrorAddList = true
      })
      .addCase(
        updateList.fulfilled,
        (state, action: PayloadAction<argsUpdate>) => {
          state.list = action.payload.json
          const indexObject = state.lists.findIndex(
            list => list.list_id === action.payload.listID,
          )
          state.lists[indexObject] = action.payload.json
          state.isLoadingUpdateList = false
          state.hasErrorUpdateList = false
        },
      )
      .addCase(updateList.pending, state => {
        state.isLoadingUpdateList = true
        state.hasErrorUpdateList = false
      })
      .addCase(updateList.rejected, state => {
        state.isLoadingUpdateList = false
        state.hasErrorUpdateList = true
      })
      .addCase(
        removeList.fulfilled,
        (state, action: PayloadAction<argsDelete>) => {
          state.list = {}
          state.lists = state.lists.filter(
            list => list.list_id !== action.payload.listID,
          )
          state.isLoadingDeleteList = false
          state.hasErrorDeleteList = false
        },
      )
      .addCase(removeList.pending, state => {
        state.isLoadingDeleteList = true
        state.hasErrorDeleteList = false
      })
      .addCase(removeList.rejected, state => {
        state.isLoadingDeleteList = false
        state.hasErrorDeleteList = true
      })
  },
})

export default list.reducer
export const { selectList } = list.actions

export const getListState = (state: RootState) => state.list

export const getListsSelector = createSelector(
  getListState,
  (slice: ListSlice) => slice?.lists,
)

export const getListsLoadingSelector = createSelector(
  getListState,
  (slice: ListSlice) => slice?.isLoadingLists,
)

export const getListsErrorSelector = createSelector(
  getListState,
  (slice: ListSlice) => slice?.hasErrorLists,
)

export const getListSelector = createSelector(
  getListState,
  (slice: ListSlice) => slice?.list,
)
export const getListIDSelector = createSelector(
  getListState,
  (slice: any) => slice?.list.list_id,
)

export const getListLoadingSelector = createSelector(
  getListState,
  (slice: ListSlice) => slice?.isLoadingList,
)

export const getListErrorSelector = createSelector(
  getListState,
  (slice: ListSlice) => slice?.hasErrorList,
)

export const addListLoadingSelector = createSelector(
  getListState,
  (slice: ListSlice) => slice?.isLoadingAddList,
)

export const addListErrorSelector = createSelector(
  getListState,
  (slice: ListSlice) => slice?.hasErrorAddList,
)

export const updateListLoadingSelector = createSelector(
  getListState,
  (slice: ListSlice) => slice?.isLoadingUpdateList,
)

export const updateListErrorSelector = createSelector(
  getListState,
  (slice: ListSlice) => slice?.hasErrorUpdateList,
)

export const deleteListLoadingSelector = createSelector(
  getListState,
  (slice: ListSlice) => slice?.isLoadingDeleteList,
)

export const deleteListErrorSelector = createSelector(
  getListState,
  (slice: ListSlice) => slice?.hasErrorDeleteList,
)
