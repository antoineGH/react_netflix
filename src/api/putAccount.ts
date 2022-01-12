import { Account, UpdateAccount } from 'types/account'
import { authFetch } from 'hooks/useAuth'

export const putAccount = async (args: UpdateAccount): Promise<Account> => {
  const user = {
    password: args.password,
    first_name: args.firstName,
    last_name: args.lastName,
  }
  try {
    const response = await authFetch(
      'https://flask-netflix-api.herokuapp.com/api/account',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      },
    )
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to update Account')
  }
}
