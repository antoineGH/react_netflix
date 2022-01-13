export type Lists = List[]

export interface List {
  list_id: number
  list_title: string
  user_id: number
  message?: string
}

export interface ListSlice {
  lists: Lists | []
  isLoadingLists: boolean
  hasErrorLists: boolean
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
