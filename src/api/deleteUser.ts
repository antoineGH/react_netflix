import { authFetch } from 'hooks/useAuth'
import { argsDelete } from 'types/user'

export const deleteUser = async (userID: number): Promise<argsDelete> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/user/${userID}`,
      {
        method: 'DELETE',
      },
    )
    const json = await response.json()
    return { json, userID }
  } catch (error) {
    console.log(error)
    throw new Error('Fail to delete user')
  }
}
