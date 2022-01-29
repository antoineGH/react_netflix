import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import {
  loadUsers,
  getUsersSelector,
  getUsersLoadingSelector,
  getUsersErrorSelector,
  selectUser,
} from 'reducers/user'
import ModalProfile from 'components/modalProfile/ModalProfile'
import { User } from 'types/user'
import { Button } from 'antd'

const UserPage = () => {
  const dispatch = useAppDispatch()

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

  return (
    <>
      <p>UserPage</p>
      <p>{String(manageProfile)}</p>
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
          <div>
            <Button onClick={handleClickManage}>Manage Profiles</Button>
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
