export type Lists = List[]

export interface List {
  list_id: number
  list_title: string
  user_id: number
  message?: string
}

export interface ListSlice {
  lists: []
  isLoadingLists: boolean
  hasErrorLists: boolean
}

export interface argsDelete {
  json: boolean
  userID: number
}

export interface args {
  listTitle: string
  userID: number
}

export interface argsUpdate {
  json: List
  userID: number
}

export interface argsPost {
  listTitle: string
  userID: number
}
