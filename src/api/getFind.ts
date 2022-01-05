import { Find, FindQuery, mediaType, mediaID, args } from 'types/find'

export const getFindID = async (args: args): Promise<Find> => {
  const mediaType: mediaType = args.mediaType
  const mediaID: mediaID = args.mediaID
  try {
    const data = await fetch(
      `https://flask-netflix-api.herokuapp.com/api/search/${mediaType}/${mediaID}`,
    )
    const json = await data.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('fail to fetch FindID')
  }
}

export const getFindQuery = async (args: args): Promise<FindQuery> => {
  const mediaType: mediaType = args.mediaType
  const mediaQuery: mediaID = args.mediaID
  try {
    const data = await fetch(
      `https://flask-netflix-api.herokuapp.com/api/search/${mediaType}?query=${mediaQuery}`,
    )
    const json = await data.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch FindQuery')
  }
}
