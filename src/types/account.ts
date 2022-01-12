export interface Account {
  account_id: number
  date_created: string
  email: string
  first_name: string
  last_name: string
}

export interface RegisterAccount {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface UpdateAccount {
  password: string
  firstName: string
  lastName: string
}

export interface AccountSlice {
  account: Account | {}
  isLoadingAccount: boolean
  hasErrorAccount: boolean
  isLoadingDeleteAccount: boolean
  hasErrorDeleteAccount: boolean
}
