import { User, argsPost } from 'types/user'
import { authFetch } from 'hooks/useAuth'

export const createUser = async (args: argsPost): Promise<User> => {
  const user = {
    profile: args.profile,
    account_id: args.accountID,
  }
  try {
    const response = await authFetch(
      'https://flask-netflix-api.herokuapp.com/api/user',
      {
        method: 'POST',
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
    throw new Error('Fail to create User')
  }
}
