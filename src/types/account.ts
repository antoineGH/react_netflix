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
