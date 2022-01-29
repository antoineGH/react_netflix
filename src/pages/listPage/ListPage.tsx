import { useEffect, useState } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import {
  loadMovies,
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
import { List } from 'types/list'
import { Button } from 'antd'
import ModalList from 'components/modalList/ModalList'

const ListPage = () => {
  useDocumentTitle('My Lists')
  const dispatch = useAppDispatch()

  const [selectedList, setSelectedList] = useState<List | null>(null)
  const [currentCount, setCurrentCount] = useState<number>(0)
  const [manageList, setManageList] = useState(false)
  const [visible, setVisible] = useState(false)

  const userID = useAppSelector(getUserIDSelector)
  // const movies = useAppSelector(getMoviesSelector)
  // const isLoadingMovies = useAppSelector(getMoviesLoadingSelector)
  // const hasErrorMovies = useAppSelector(getMoviesErrorSelector)
  const listID = useAppSelector(getListIDSelector)
  const lists = useAppSelector(getListsSelector)
  const isLoadingLists = useAppSelector(getListsLoadingSelector)
  const hasErrorLists = useAppSelector(getListsErrorSelector)

  useEffect(() => {
    if (userID) {
      dispatch(loadLists(userID))
    }
  }, [dispatch, userID])

  // useEffect(() => {
  //   if (listID) {
  //     dispatch(loadMovies(listID))
  //   }
  // }, [dispatch, listID])

  const handleClickManage = (): void => {
    setManageList(!manageList)
  }

  const handleSelectList = (list: List): void => {
    if (manageList) {
      setSelectedList(list)
      setVisible(true)
      return
    }
    dispatch(loadMovies(listID))
  }

  return (
    <>
      <p>My Lists</p>
      <p>{String(manageList)}</p>
      {hasErrorLists ? (
        <p>Error List</p>
      ) : isLoadingLists ? (
        <p>Loading Lists</p>
      ) : (
        lists.map((list, count) => {
          count++
          return (
            <Button
              key={list.list_id}
              onClick={() => {
                handleSelectList(list)
              }}
            >
              {list.list_title}
            </Button>
          )
        })
      )}
      {!hasErrorLists && !isLoadingLists && (
        <>
          <div>
            <Button onClick={handleClickManage}>Manage Lists</Button>
          </div>
          {selectedList && (
            <ModalList
              list={selectedList}
              count={currentCount}
              lists={lists}
              visible={visible}
              setVisible={setVisible}
            />
          )}
        </>
      )}
    </>
  )
}

export default ListPage

/* {listID ? (
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
      )} */
