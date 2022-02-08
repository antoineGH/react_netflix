import { Users, User, args, argsPost, argsUpdate, argsDelete } from 'types/user'
import { authFetch } from 'hooks/useAuth'

export const getUsers = async (): Promise<Users> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/users`,
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to fetch users')
    }
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch users')
  }
}

export const getUser = async (userID: number): Promise<User> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/user/${userID}`,
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to get user')
    }
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch user')
  }
}

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
    if (json.hasOwnProperty('msg')) {
      throw new Error(json.msg)
    }
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to create User')
  }
}

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
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to update user')
    }
    return { json, userID }
  } catch (error) {
    console.log(error)
    throw new Error('Fail to update User')
  }
}

export const deleteUser = async (userID: number): Promise<argsDelete> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/user/${userID}`,
      {
        method: 'DELETE',
      },
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to delete user')
    }
    return { json, userID }
  } catch (error) {
    console.log(error)
    throw new Error('Fail to delete user')
  }
}
