import { useEffect, useState } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import {
  loadUsers,
  getUsersSelector,
  getUsersLoadingSelector,
  getUsersErrorSelector,
  selectUser,
} from 'reducers/user'
import ModalProfile from 'components/modalProfile/ModalProfile'
import ModalAddUser from 'components/modalAddUser/ModalAddUser'
import { User } from 'types/user'
import { Button, Switch } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

const UserPage = () => {
  const dispatch = useAppDispatch()
  useDocumentTitle('Select Profile')

  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch])

  const users = useAppSelector(getUsersSelector)
  const isLoadingUsers = useAppSelector(getUsersLoadingSelector)
  const hasErrorUsers = useAppSelector(getUsersErrorSelector)

  const [manageProfile, setManageProfile] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [currentCount, setCurrentCount] = useState<number>(0)
  const [visible, setVisible] = useState(false)
  const [visibleAdd, setVisibleAdd] = useState(false)

  const handleClickManage = (): void => {
    setManageProfile(!manageProfile)
  }

  const handleClickAdd = (): void => {
    setVisibleAdd(!visibleAdd)
  }

  const handleSelectUser = (user: User, count: number) => {
    if (manageProfile) {
      setSelectedUser(user)
      setCurrentCount(count)
      setVisible(true)
      return
    }
    dispatch(selectUser(user.user_id))
  }

  return (
    <>
      {manageProfile ? <p>Manage Profiles</p> : <p>Who's watching?</p>}
      {hasErrorUsers ? (
        <p>Error Users</p>
      ) : isLoadingUsers ? (
        <p>Loading Users</p>
      ) : (
        users.map((user, count) => {
          count++
          return (
            <Button
              key={user.user_id}
              onClick={() => handleSelectUser(user, count)}
            >
              {user.profile}
            </Button>
          )
        })
      )}
      {!hasErrorUsers && !isLoadingUsers && (
        <>
          {manageProfile && users.length <= 4 && (
            <>
              <ModalAddUser
                users={users}
                visible={visibleAdd}
                setVisible={setVisibleAdd}
              />
              <Button onClick={handleClickAdd}>Add</Button>
            </>
          )}
          <div>
            <Switch
              checkedChildren={<SettingOutlined />}
              unCheckedChildren={<SettingOutlined />}
              checked={manageProfile}
              onClick={handleClickManage}
              size="default"
            />
          </div>
          {selectedUser && (
            <ModalProfile
              user={selectedUser}
              count={currentCount}
              users={users}
              visible={visible}
              setVisible={setVisible}
            />
          )}
        </>
      )}
    </>
  )
}

export default UserPage
