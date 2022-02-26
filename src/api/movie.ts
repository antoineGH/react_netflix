import { Movies, Movie, argsDelete, argsPost, MoviesDetails } from 'types/movie'
import { authFetch } from 'hooks/useAuth'
import { openNotificationWithIcon } from 'utils/notification'

export const getMovies = async (listID: number): Promise<Movies> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/medias/${listID}`,
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to fetch Movies')
    }
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch Movies')
  }
}

export const getMovie = async (mediaID: number): Promise<Movie> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/media/${mediaID}`,
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to fetch Movie')
    }
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch Movie')
  }
}

export const getMovieDetail = async (
  tmdbID: number,
): Promise<MoviesDetails> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/search/media/${tmdbID}`,
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to fetch Movie Detail')
    }
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch Movie Detail')
  }
}

export const createMovie = async (args: argsPost): Promise<Movie> => {
  const media = {
    tmdb_id: args.tmdbID,
    media_type: args.mediaType,
    list_id: args.listID,
  }
  try {
    const response = await authFetch(
      'https://flask-netflix-api.herokuapp.com/api/media',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(media),
      },
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg')) {
      openNotificationWithIcon('error', 'Error', json.msg)
      throw new Error('Fail to add Movie')
    }
    return json
  } catch (error) {
    throw new Error('Fail to add Movie')
  }
}

export const deleteMovie = async (mediaID: number): Promise<argsDelete> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/media/${mediaID}`,
      {
        method: 'DELETE',
      },
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg') || !json) {
      throw new Error('Fail to delete Movie')
    }
    return { json, mediaID }
  } catch (error) {
    console.log(error)
    throw new Error('Fail to delete Movie')
  }
}
