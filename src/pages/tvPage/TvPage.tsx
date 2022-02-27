import { Button, Menu } from 'antd'
import { ExceptionMap } from 'antd/lib/result'
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
import { addMovie, getMoviesSelector, loadMovies } from 'reducers/movie'

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
  const [menu, setMenu] = useState<any>(null)

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
  const movies = useAppSelector(getMoviesSelector)

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

  useEffect(() => {
    if (lists.length) {
      const myMenu = (
        <Menu>
          {lists.map(list => {
            return (
              <Menu.Item key={list.list_id}>
                <Button onClick={() => handleAddList(list.list_id)}>
                  {list.list_title}
                </Button>
                <Button onClick={() => handleRemoveList(14)}>Delete</Button>
                inList?
                {list.list_id}
              </Menu.Item>
            )
          })}
        </Menu>
      )
      setMenu(myMenu)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists, selectedMedia])

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
    setSelectedMedia(trending)
    setVisible(!visible)
  }

  const handleAddList = (list_id: number): void => {
    dispatch(
      addMovie({
        tmdbID: selectedMedia?.id,
        mediaType: 'tv',
        listID: list_id,
      }),
    )
  }

  const handleRemoveList = (movieID: number): void => {
    console.log(`remove movie (movieID: ${movieID}) from list`)
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
          return (
            <div key={result.id}>
              <Button onClick={() => handleSelectTrending(result)}>
                {result.name}
              </Button>
            </div>
          )
        })
      )}
      <Button onClick={loadMore}>LOAD MORE</Button>
      {/* use WayPoint to implement infinite scrolling */}
      {selectedMedia && lists && (
        <ModalMedia
          media={selectedMedia}
          menu={menu}
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
