import { useEffect, useState } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { getUserIDSelector } from 'reducers/user'
import {
  loadLists,
  getListsSelector,
  getListsLoadingSelector,
  getListsErrorSelector,
  selectList,
} from 'reducers/list'
import { List } from 'types/list'
import { Button, Switch, Breadcrumb } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import ModalList from 'components/modalList/ModalList'
import { useNavigate } from 'react-router'
import ModalAddList from 'components/modalAddList/ModalAddList'
import CustomLink from 'components/header/menuHeader/utils/CustomLinks'

const ListPage = () => {
  useDocumentTitle('My Lists')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [selectedList, setSelectedList] = useState<List | null>(null)
  const [currentCount, setCurrentCount] = useState<number>(0)
  const [manageList, setManageList] = useState(false)
  const [visible, setVisible] = useState(false)
  const [visibleAdd, setVisibleAdd] = useState(false)

  const userID = useAppSelector(getUserIDSelector)
  const lists = useAppSelector(getListsSelector)
  const isLoadingLists = useAppSelector(getListsLoadingSelector)
  const hasErrorLists = useAppSelector(getListsErrorSelector)

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
    dispatch(selectList(list.list_id))
    navigate(`/auth/list/${list.list_id}`)
  }

  const handleClickAdd = (): void => {
    setVisibleAdd(!visibleAdd)
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <CustomLink to="/auth/browse">Home</CustomLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>My Lists</Breadcrumb.Item>
      </Breadcrumb>
      {manageList ? <p>Manage Lists</p> : <p>My Lists</p>}
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
            <>
              <ModalAddList
                lists={lists}
                userID={userID}
                visible={visibleAdd}
                setVisible={setVisibleAdd}
              />
              <Button onClick={handleClickAdd}>Add</Button>
            </>
          )}
          <div>
            <p>Manage List</p>
            <Switch
              checkedChildren={<SettingOutlined />}
              unCheckedChildren={<SettingOutlined />}
              checked={manageList}
              onClick={handleClickManage}
              size="default"
            />
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
