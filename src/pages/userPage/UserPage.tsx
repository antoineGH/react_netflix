import { useEffect, useState } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import {
  loadUsers,
  getUsersSelector,
  getUsersLoadingSelector,
  getUsersErrorSelector,
  selectUser,
  addUser,
  addUsersLoadingSelector,
  addUsersErrorSelector,
  unsetErrorAdd,
} from 'reducers/user'
import ModalProfile from 'components/modalProfile/ModalProfile'
import { User } from 'types/user'
import { Button, Alert, Switch, Input } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { getAccountIDSelector } from 'reducers/account'

const UserPage = () => {
  const dispatch = useAppDispatch()
  useDocumentTitle('Select Profile')

  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch])

  const users = useAppSelector(getUsersSelector)
  const isLoadingUsers = useAppSelector(getUsersLoadingSelector)
  const hasErrorUsers = useAppSelector(getUsersErrorSelector)
  const isLoadingAddUser = useAppSelector(addUsersLoadingSelector)
  const hasErrorAddUser = useAppSelector(addUsersErrorSelector)
  const accountID = useAppSelector(getAccountIDSelector)

  const [manageProfile, setManageProfile] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [currentCount, setCurrentCount] = useState<number>(0)
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profileToAdd, setProfileToAdd] = useState('')

  useEffect(() => {
    if (hasErrorAddUser) {
      setError('Impossible to add user')
      dispatch(unsetErrorAdd())
    }
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }, [hasErrorAddUser, error, dispatch])

  const handleClickManage = (): void => {
    setManageProfile(!manageProfile)
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

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setProfileToAdd(e.currentTarget.value)
  }

  const createUser = (newProfile: string) => {
    let hasExistingUser = false
    users.forEach(user => {
      if (user.profile === newProfile) {
        hasExistingUser = true
      }
    })
    if (hasExistingUser) {
      setError('Profile already existing, choose a different name')
      return
    }
    dispatch(addUser({ profile: newProfile, accountID }))
    setProfileToAdd('')
  }

  return (
    <>
      {manageProfile ? <p>Manage Profiles</p> : <p>Who's watching?</p>}
      {error && <Alert message={error} type="error" />}
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
              <Input
                placeholder=""
                onChange={handleChange}
                value={profileToAdd}
                disabled={isLoadingAddUser}
                onPressEnter={() => createUser(profileToAdd)}
              />
              <Button
                loading={isLoadingAddUser}
                onClick={() => createUser(profileToAdd)}
              >
                Add
              </Button>
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
