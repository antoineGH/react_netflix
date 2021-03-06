import { Lists, List, args, argsDelete, argsUpdate, argsPost } from 'types/list'
import { authFetch } from 'hooks/useAuth'

export const getLists = async (userID: number): Promise<Lists> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/lists/${userID}`,
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to fetch Lists')
    }
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch Lists')
  }
}

export const getList = async (listID: number): Promise<List> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/list/${listID}`,
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to fetch List')
    }
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch List')
  }
}

export const createList = async (args: argsPost): Promise<List> => {
  const list = {
    list_title: args.listTitle,
    user_id: args.userID,
  }
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/list`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(list),
      },
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to create List')
    }
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to create List')
  }
}

export const putList = async (args: args): Promise<argsUpdate> => {
  const list = { list_title: args.listTitle }
  const listID = args.listID
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/list/${listID}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(list),
      },
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to update List')
    }
    return { json, listID }
  } catch (error) {
    console.log(error)
    throw new Error('Fail to update List')
  }
}

export const deleteList = async (listID: number): Promise<argsDelete> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/list/${listID}`,
      {
        method: 'DELETE',
      },
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg') || !json) {
      throw new Error('Fail to delete List')
    }
    return { json, listID }
  } catch (error) {
    console.log(error)
    throw new Error('Fail to delete List')
  }
}
