import { mediaType, Genre, Genres } from 'types/genre'

export const getGenre = async (
  mediaType: mediaType,
): Promise<typeof Genres> => {
  const data = await fetch(
    `https://flask-netflix-api.herokuapp.com/api/genre/${mediaType}/list`,
  )
  const json = await data.json()

  return new Promise((resolve, reject) => {
    if (json) {
      if (json.hasOwnProperty('genres')) {
        resolve(json)
      }
      reject(json)
    }
    reject()
  })
}
