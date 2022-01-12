import { authFetch } from 'hooks/useAuth'

export const deleteUser = async (userID: number): Promise<boolean> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/user/${userID}`,
      {
        method: 'DELETE',
      },
    )
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to delete user')
  }
}
