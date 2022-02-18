import { Button } from 'antd'
import ModalMedia from 'components/modalMedia/ModalMedia'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { useEffect, useState } from 'react'
import {
  getDiscoverErrorSelector,
  getDiscoverLoadingSelector,
  getDiscoverPageSelector,
  getDiscoverSelector,
  loadDiscover,
  loadMoreDiscover,
} from 'reducers/discover'
import {
  getGenreErrorSelector,
  getGenreLoadingSelector,
  getGenreSelector,
  loadGenres,
} from 'reducers/genres'
import {
  getListErrorSelector,
  getListLoadingSelector,
  getListsSelector,
} from 'reducers/list'

import {
  getTrendingErrorSelector,
  getTrendingLoadingSelector,
  getTrendingSelector,
  loadTrending,
} from 'reducers/trending'
import { getUserIDSelector } from 'reducers/user'
import { Trending } from 'types/trending'

const TvPage = () => {
  useDocumentTitle('TV Shows')

  const [selectedMedia, setSelectedMedia] = useState<Trending | null>(null)
  const [visible, setVisible] = useState(false)

  const dispatch = useAppDispatch()
  const userID = useAppSelector(getUserIDSelector)
  const trendings = useAppSelector(getTrendingSelector)
  const isLoadingTrendings = useAppSelector(getTrendingLoadingSelector)
  const hasErrorTrendings = useAppSelector(getTrendingErrorSelector)
  const genres = useAppSelector(getGenreSelector)
  const isLoadingGenres = useAppSelector(getGenreLoadingSelector)
  const hasErrorGenres = useAppSelector(getGenreErrorSelector)
  const discover = useAppSelector(getDiscoverSelector)
  const isLoadingDiscover = useAppSelector(getDiscoverLoadingSelector)
  const hasErrorDiscover = useAppSelector(getDiscoverErrorSelector)
  const lists = useAppSelector(getListsSelector)
  const isLoadingLists = useAppSelector(getListLoadingSelector)
  const hasErrorLists = useAppSelector(getListErrorSelector)
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
        SortByDiscover: 'popularity.desc',
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
        SortByDiscover: 'popularity.desc',
        Page: page + 1,
      }),
    )
  }

  const handleSelectTrending = (trending: Trending): void => {
    setSelectedMedia(null)
    setSelectedMedia(trending)
    setVisible(!visible)
  }

  return (
    <>
      <p>TvPage</p>
      <p>Trending TV Show</p>
      {hasErrorTrendings ? (
        <p>Error Trendings</p>
      ) : isLoadingTrendings ? (
        <p>Loading Trendings</p>
      ) : (
        trendings.map(trending => {
          return (
            <div key={trending.id}>
              <Button onClick={() => handleSelectTrending(trending)}>
                {trending.name}
              </Button>
            </div>
          )
        })
      )}
      <p>Discover</p>
      {hasErrorDiscover ? (
        <p>Error Discover</p>
      ) : isLoadingDiscover ? (
        <p>Loading Discover</p>
      ) : (
        discover?.results?.map(result => {
          return <div key={result.id}>{result.name}</div>
        })
      )}
      <Button onClick={loadMore}>LOAD MORE</Button>
      {/* use WayPoint to implement infinite scrolling */}
      {selectedMedia && lists && (
        <ModalMedia
          media={selectedMedia}
          userID={userID}
          lists={lists}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </>
  )
}

export default TvPage
