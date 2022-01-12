import { User, args } from 'types/user'
import { authFetch } from 'hooks/useAuth'

export const putUser = async (args: args): Promise<User> => {
  const user = { profile: args.profile }
  const userID = args.userID
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/user/${userID}`,
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
    throw new Error('Fail to update User')
  }
}
