import { Movies, Movie, argsDelete, argsPost } from 'types/movie'
import { authFetch } from 'hooks/useAuth'

export const getMovies = async (listID: number): Promise<Movies> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/movies/${listID}`,
    )
    const json = response.json()
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to fetch Movies')
    }
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch Movies')
  }
}
export const getMovie = async (movieID: number): Promise<Movie> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/movie/${movieID}`,
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
export const createMovie = async (args: argsPost): Promise<Movie> => {
  const movie = {
    tmdb_id: args.tmdbID,
    list_id: args.listID,
  }
  try {
    const response = await authFetch(
      'https://flask-netflix-api.herokuapp.com/api/movie',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      },
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg')) {
      throw new Error('Fail to add Movie')
    }
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to add Movie')
  }
}

export const deleteMovie = async (movieID: number): Promise<argsDelete> => {
  try {
    const response = await authFetch(
      `https://flask-netflix-api.herokuapp.com/api/movie/${movieID}`,
      {
        method: 'DELETE',
      },
    )
    const json = await response.json()
    if (json.hasOwnProperty('msg') || !json) {
      throw new Error('Fail to delete Movie')
    }
    return { json, movieID }
  } catch (error) {
    console.log(error)
    throw new Error('Fail to delete Movie')
  }
}
