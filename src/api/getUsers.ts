import { Users } from 'types/user'
import { authFetch } from 'hooks/useAuth'

export const getUser = async (): Promise<Users> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/users`,
    )
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch users')
  }
}
