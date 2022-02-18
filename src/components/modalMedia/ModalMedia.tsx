import { Alert, Button, Dropdown, Menu, Modal } from 'antd'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { useEffect, useState } from 'react'
import {
  loadLists,
  updateListErrorSelector,
  updateListLoadingSelector,
} from 'reducers/list'
import { addMovie } from 'reducers/movie'
import { Lists, List } from 'types/list'
import { Trending } from 'types/trending'

interface props {
  media: Trending
  lists: Lists
  userID: number
  visible: boolean
  setVisible: (bool: boolean) => void
}

const ModalMedia = ({ media, lists, userID, visible, setVisible }: props) => {
  const dispatch = useAppDispatch()
  const [menu, setMenu] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const isLoadingUpdateList = useAppSelector(updateListLoadingSelector)
  const hasErrorUpdateList = useAppSelector(updateListErrorSelector)

  useEffect(() => {
    if (hasErrorUpdateList) {
      setError('Impossible to update list')
    }
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }, [hasErrorUpdateList, error])

  useEffect(() => {
    if (!lists.length) {
      dispatch(loadLists(userID))
    }
  }, [dispatch, lists, userID])

  useEffect(() => {
    if (lists.length) {
      const tempMenu = (
        <Menu>
          {lists.map(list => {
            return (
              <Menu.Item
                key={list.list_id}
                onClick={() => addList(list, media)}
              >
                {list.list_title}
              </Menu.Item>
            )
          })}
        </Menu>
      )
      setMenu(tempMenu)
    }
  }, [lists, media])

  const addList = (list: List, media: Trending): void => {
    console.log(
      `dispatch addMovie(id: ${media?.id}, media_type: ${media?.media_type}, list_id: ${list.list_id})`,
    )
    dispatch(
      addMovie({
        tmdbID: media?.id,
        mediaType: media.media_type,
        listID: list.list_id,
      }),
    )
  }

  return (
    <Modal
      getContainer={false}
      title={media.name}
      centered
      visible={visible}
      okText="Update"
      cancelText="Close"
      okButtonProps={{
        loading: isLoadingUpdateList,
      }}
      //   onOk={}
      onCancel={() => setVisible(false)}
      width={1000}
    >
      {error && <Alert message={error} type="error" />}
      {menu && (
        <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <Button loading={isLoadingUpdateList}>Add to my list</Button>
        </Dropdown>
      )}
      <p>{media.name}</p>
    </Modal>
  )
}
export default ModalMedia
