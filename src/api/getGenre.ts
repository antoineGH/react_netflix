import { mediaType, Genres } from 'types/genre'

export const getGenre = async (mediaType: mediaType): Promise<Genres> => {
  try {
    const data = await fetch(
      `https://flask-netflix-api.herokuapp.com/api/genre/${mediaType}/list`,
    )
    const json = await data.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch Genre')
  }
}
