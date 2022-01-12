import { User } from 'types/user'
import { authFetch } from 'hooks/useAuth'

export const getUser = async (userID: number): Promise<User> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/user/${userID}`,
    )
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch user')
  }
}
