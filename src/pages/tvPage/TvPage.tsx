import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { useEffect } from 'react'
import { getGenreSelector, loadGenres } from 'reducers/genres'
import { getTrendingSelector, loadTrending } from 'reducers/trending'

const TvPage = () => {
  useDocumentTitle('TV Shows')
  const dispatch = useAppDispatch()
  const genres = useAppSelector(getGenreSelector)
  const trendings = useAppSelector(getTrendingSelector)

  useEffect(() => {
    if (!genres.length) {
      dispatch(loadGenres('tv'))
    }
  }, [genres, dispatch])

  useEffect(() => {
    if (!trendings.length) {
      dispatch(loadTrending({ trendingMediaType: 'tv', trendingTime: 'week' }))
    }
  }, [trendings, dispatch])

  return (
    <>
      <p>TvPage</p>
      <p>Trending TV Show</p>
    </>
  )
}

export default TvPage
