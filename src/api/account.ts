import { Account, UpdateAccount } from 'types/account'
import { authFetch } from 'hooks/useAuth'

export const getAccount = async (): Promise<Account> => {
  try {
    const data = await fetch(
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
