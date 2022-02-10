import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { useEffect } from 'react'
import { getGenreSelector, loadGenres } from 'reducers/genres'

const MoviePage = () => {
  useDocumentTitle('Movies')
  const dispatch = useAppDispatch()
  const genres = useAppSelector(getGenreSelector)

  useEffect(() => {
    if (!genres.length) {
      dispatch(loadGenres('movie'))
    }
  }, [genres, dispatch])

  return <p>MoviePage</p>
}

export default MoviePage
