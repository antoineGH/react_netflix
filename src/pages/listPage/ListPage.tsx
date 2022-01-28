import { useEffect } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { loadMovies } from 'reducers/movie'
import {
  getMoviesSelector,
  getMoviesLoadingSelector,
  getMoviesErrorSelector,
} from 'reducers/movie'

const ListPage = () => {
  useDocumentTitle('My List')
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadMovies(12))
  }, [dispatch])

  const movies = useAppSelector(getMoviesSelector)
  const isLoadingMovies = useAppSelector(getMoviesLoadingSelector)
  const hasErrorMovies = useAppSelector(getMoviesErrorSelector)

  return (
    <>
      <p>My List</p>
      {hasErrorMovies ? (
        <p>Error Movies</p>
      ) : isLoadingMovies ? (
        <p>Loading Movies</p>
      ) : (
        movies.map(movie => {
          return <p key={movie.movie_id}>{String(movie.tmdb_id)}</p>
        })
      )}
    </>
  )
}

export default ListPage
