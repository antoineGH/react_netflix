import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { useEffect } from 'react'
import {
  getDiscoverPageSelector,
  loadDiscover,
  loadMoreDiscover,
} from 'reducers/discover'
import { getGenreSelector, loadGenres } from 'reducers/genres'
import { getTrendingSelector, loadTrending } from 'reducers/trending'

const TvPage = () => {
  useDocumentTitle('TV Shows')
  const dispatch = useAppDispatch()
  const genres = useAppSelector(getGenreSelector)
  const trendings = useAppSelector(getTrendingSelector)
  const page = useAppSelector(getDiscoverPageSelector)

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

  useEffect(() => {
    dispatch(
      loadDiscover({
        MediaTypeDiscover: 'tv',
        LanguageDiscover: 'en-US',
        YearDiscover: 0,
        GenreDiscover: 0,
        SortByDiscover: 'popularity.asc',
        Page: 1,
      }),
    )
  }, [dispatch])

  const loadMore = (): void => {
    console.log('Time to load more')
    console.log(`Current Page from Store => ${page}`)
    dispatch(
      loadMoreDiscover({
        MediaTypeDiscover: 'tv',
        LanguageDiscover: 'en-US',
        YearDiscover: 0,
        GenreDiscover: 0,
        SortByDiscover: 'popularity.asc',
        Page: page + 1,
      }),
    )
  }

  return (
    <>
      <p>TvPage</p>
      <p>Trending TV Show</p>
      <Button onClick={loadMore}>LOAD MORE</Button>
      {/* use WayPoint to implement infinite scrolling */}
    </>
  )
}

export default TvPage
