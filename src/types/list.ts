export type Lists = List[]

export interface List {
  list_id: number
  list_title: string
  user_id: number
  message?: string
}

export interface ListSlice {
  list: List | {}
  lists: Lists
  isLoadingLists: boolean
  hasErrorLists: boolean
  isLoadingList: boolean
  hasErrorList: boolean
  isLoadingAddList: boolean
  hasErrorAddList: boolean
  isLoadingUpdateList: boolean
  hasErrorUpdateList: boolean
  isLoadingDeleteList: boolean
  hasErrorDeleteList: boolean
}

export interface argsDelete {
  json: boolean
  listID: number
}

export interface args {
  listTitle: string
  listID: number
}

export interface argsUpdate {
  json: List
  listID: number
}

export interface argsPost {
  listTitle: string
  userID: number
}
