import { useState, useEffect } from 'react'
import { Modal, Button, Alert } from 'antd'
import { List, Lists } from 'types/list'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import {
  updateListLoadingSelector,
  updateListErrorSelector,
  deleteListLoadingSelector,
  deleteListErrorSelector,
  updateList,
  removeList,
} from 'reducers/list'

interface props {
  list: List
  count: number
  lists: Lists
  visible: boolean
  setVisible: (bool: boolean) => void
}

const ModalList = ({ list, count, lists, visible, setVisible }: props) => {
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string | null>(null)

  const isLoadingUpdateList = useAppSelector(updateListLoadingSelector)
  const hasErrorUpdateList = useAppSelector(updateListErrorSelector)
  const isLoadingDeleteList = useAppSelector(deleteListLoadingSelector)
  const hasErrorDeleteList = useAppSelector(deleteListErrorSelector)

  useEffect(() => {
    if (hasErrorUpdateList) {
      setError('Impossible to update list')
    }
    if (hasErrorDeleteList) {
      setError('Impossible to delete list')
    }
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }, [hasErrorUpdateList, hasErrorDeleteList, error])

  const putList = (listID: number, newList: string) => {
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
    dispatch(updateList({ listTitle: newList, listID }))
    setVisible(false)
  }
  const deleteList = (listID: number) => {
    if (lists.length <= 1) {
      setError('Impossible to delete default list')
      return
    }
    dispatch(removeList(listID))
    setVisible(false)
  }

  return (
    <Modal
      title="Modal"
      centered
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      width={1000}
    >
      {error && <Alert message={error} type="error" />}
      <p>{list.list_title}</p>

      <Button
        loading={isLoadingUpdateList}
        onClick={() => putList(list.list_id, 'new list name updated')}
      >
        Rename
      </Button>
      {count !== 1 && (
        <Button
          loading={isLoadingDeleteList}
          onClick={() => deleteList(list.list_id)}
        >
          Delete
        </Button>
      )}
    </Modal>
  )
}

export default ModalList
