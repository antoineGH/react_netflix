import { Alert, Button, Dropdown, Modal } from 'antd'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { useEffect, useState } from 'react'
import {
  loadLists,
  updateListErrorSelector,
  updateListLoadingSelector,
} from 'reducers/list'
import { Lists } from 'types/list'
import { Trending } from 'types/trending'

interface props {
  media: Trending
  menu: any
  lists: Lists
  userID: number
  visible: boolean
  setVisible: (bool: boolean) => void
}

const ModalMedia = ({
  media,
  menu,
  lists,
  userID,
  visible,
  setVisible,
}: props) => {
  const dispatch = useAppDispatch()

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

  return (
    <Modal
      getContainer={false}
      title={media.name}
      centered
      visible={visible}
      okText="OK"
      cancelText="Close"
      okButtonProps={{
        loading: isLoadingUpdateList,
      }}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      width={1000}
    >
      {error && <Alert message={error} type="error" />}

      <Dropdown overlay={menu} placement="bottomCenter" arrow>
        <Button loading={isLoadingUpdateList}>Add to my list</Button>
      </Dropdown>

      <p>{media.name}</p>
    </Modal>
  )
}
export default ModalMedia
