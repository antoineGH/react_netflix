import { Credits, args } from 'types/credit'

export const getCredits = async (args: args): Promise<Credits> => {
  const { mediaType, mediaID } = args
  try {
    const data = await fetch(
      `https://flask-netflix-api.herokuapp.com/api/${mediaType}/${mediaID}/credits`,
    )
    const json = await data.json()
    console.log(json)
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch Credits')
  }
}
