import { Account } from 'types/account'

interface props {
  account: Account
}
const AccountDetails = ({ account }: props) => {
  return (
    <>
      <p>{account.email}</p>
      <p>{account.first_name}</p>
      <p>{account.last_name}</p>
      <p>{account.date_created}</p>
    </>
  )
}

export default AccountDetails
