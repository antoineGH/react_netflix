import { Account } from 'types/account'
import { authFetch } from 'hooks/useAuth'

export const getAccount = async (): Promise<Account> => {
  try {
    const data = await authFetch(
      'https://flask-netflix-api.herokuapp.com/api/account',
    )
    const json = await data.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch account')
  }
}
