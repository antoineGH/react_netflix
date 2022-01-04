import { External, args } from 'types/external'

export const getExternal = async (args: args): Promise<External> => {
  const { mediaType, mediaID } = args
  try {
    const data = await fetch(
      `https://flask-netflix-api.herokuapp.com/api/${mediaType}/${mediaID}/external_ids`,
    )
    const json = data.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch External')
  }
}
