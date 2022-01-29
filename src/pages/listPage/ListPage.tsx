import { useEffect, useState } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { getUserIDSelector } from 'reducers/user'
import {
  loadLists,
  getListIDSelector,
  getListsSelector,
  getListsLoadingSelector,
  getListsErrorSelector,
  addListLoadingSelector,
  addList,
  addListErrorSelector,
} from 'reducers/list'
import { List } from 'types/list'
import { Button, Alert } from 'antd'
import ModalList from 'components/modalList/ModalList'

const ListPage = () => {
  useDocumentTitle('My Lists')
  const dispatch = useAppDispatch()

  const [selectedList, setSelectedList] = useState<List | null>(null)
  const [currentCount, setCurrentCount] = useState<number>(0)
  const [manageList, setManageList] = useState(false)
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const userID = useAppSelector(getUserIDSelector)
  const listID = useAppSelector(getListIDSelector)
  const lists = useAppSelector(getListsSelector)
  const isLoadingLists = useAppSelector(getListsLoadingSelector)
  const hasErrorLists = useAppSelector(getListsErrorSelector)
  const isLoadingAddList = useAppSelector(addListLoadingSelector)
  const hasErrorAddList = useAppSelector(addListErrorSelector)

  useEffect(() => {
    if (hasErrorAddList) {
      setError('Impossible to add list')
    }
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }, [hasErrorAddList, error])

  useEffect(() => {
    if (userID) {
      dispatch(loadLists(userID))
    }
  }, [dispatch, userID])

  const handleClickManage = (): void => {
    setManageList(!manageList)
  }

  const handleSelectList = (list: List, count: number): void => {
    if (manageList) {
      setSelectedList(list)
      setCurrentCount(count)
      setVisible(true)
      return
    }
    // BUG:HANDLE LOAD LIST'S MOVIES, AS A COMPONENT ?
    // dispatch(loadMovies(listID))
  }

  const createList = (newList: string) => {
    let hasExistingList = false
    lists.forEach(list => {
      if (list.list_title === newList) {
        hasExistingList = true
      }
    })
    if (hasExistingList) {
      setError('List already existing, choose a different name')
      return
    }
    dispatch(addList({ listTitle: newList, userID }))
    setVisible(false)
  }

  return (
    <>
      <p>My Lists</p>
      {error && <Alert message={error} type="error" />}
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
                handleSelectList(list, count)
              }}
            >
              {list.list_title}
            </Button>
          )
        })
      )}
      {!hasErrorLists && !isLoadingLists && (
        <>
          {manageList && (
            <Button
              loading={isLoadingAddList}
              onClick={() => createList('new list name')}
            >
              Add
            </Button>
          )}
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
