import { args, argsUpdate } from 'types/user'
import { authFetch } from 'hooks/useAuth'

export const putUser = async (args: args): Promise<argsUpdate> => {
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
    return { json, userID }
  } catch (error) {
    console.log(error)
    throw new Error('Fail to update User')
  }
}
