import { Account, UpdateAccount } from 'types/account'
import { authFetch } from 'hooks/useAuth'

export const getAccount = async (): Promise<Account> => {
  try {
    const data = await authFetch(
      'https://flask-netflix-api.herokuapp.com/api/account',
    )
    const json = await data.json()
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to fetch account')
    }
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch account')
  }
}

export const putAccount = async (args: UpdateAccount): Promise<Account> => {
  let user: any = {}
  if (args.password) {
    user.password = args.password
  }
  if (args.firstName) {
    user.first_name = args.firstName
  }
  if (args.lastName) {
    user.last_name = args.lastName
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
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to update account')
    }
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to update Account')
  }
}

export const deleteAccount = async (): Promise<boolean> => {
  try {
    const response = await authFetch(
      'https://flask-netflix-api.herokuapp.com/api/account',
      {
        method: 'DELETE',
      },
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to delete account')
    }
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to delete account')
  }
}
