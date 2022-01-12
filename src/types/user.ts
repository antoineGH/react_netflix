export type Users = User[]

export interface User {
  account_id: number
  user_id: number
  profile: string
}

export interface UserSlice {
  user: User | {}
  users: Users
  isLoadingUser: boolean
  hasErrorUser: boolean
  isLoadingUsers: boolean
  hasErrorUsers: boolean
  isLoadingAddUser: boolean
  hasErrorAddUser: boolean
  isLoadingDeleteUser: boolean
  hasErrorDeleteUser: boolean
  isLoadingUpdateUser: boolean
  hasErrorUpdateUser: boolean
}

export interface UpdateUser {
  profile: string
}

export interface args {
  profile: string
  userID: number
}

export interface argsPost {
  profile: string
  accountID: number
}
