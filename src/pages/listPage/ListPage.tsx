import { useEffect } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { loadMovies } from 'reducers/movie'
import {
  getMoviesSelector,
  getMoviesLoadingSelector,
  getMoviesErrorSelector,
} from 'reducers/movie'
import { getUserIDSelector } from 'reducers/user'
import {
  loadLists,
  selectList,
  getListIDSelector,
  getListsSelector,
  getListsLoadingSelector,
  getListsErrorSelector,
} from 'reducers/list'

const ListPage = () => {
  useDocumentTitle('My List')
  const dispatch = useAppDispatch()
  const userID = useAppSelector(getUserIDSelector)
  const movies = useAppSelector(getMoviesSelector)
  const isLoadingMovies = useAppSelector(getMoviesLoadingSelector)
  const hasErrorMovies = useAppSelector(getMoviesErrorSelector)
  const listID = useAppSelector(getListIDSelector)
  const lists = useAppSelector(getListsSelector)
  const isLoadingLists = useAppSelector(getListsLoadingSelector)
  const hasErrorLists = useAppSelector(getListsErrorSelector)

  useEffect(() => {
    if (userID) {
      dispatch(loadLists(userID))
    }
  }, [dispatch, userID])

  useEffect(() => {
    if (listID) {
      dispatch(loadMovies(listID))
    }
  }, [dispatch, listID])

  return (
    <>
      <p>My Lists</p>

      {listID ? (
        hasErrorMovies ? (
          <p>Error Movies</p>
        ) : isLoadingMovies ? (
          <p>Loading Movies</p>
        ) : (
          movies.map(movie => {
            return <p key={movie.movie_id}>{String(movie.tmdb_id)}</p>
          })
        )
      ) : hasErrorLists ? (
        <p>Error List</p>
      ) : isLoadingLists ? (
        <p>Loading Lists</p>
      ) : (
        lists.map(list => {
          return (
            <button
              key={list.list_id}
              onClick={() => dispatch(selectList(list.list_id))}
            >
              {String(list.list_title)}
            </button>
          )
        })
      )}
    </>
  )
}

export default ListPage
