import { useState } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { useAppSelector } from 'hooks/hooks'
import { User } from 'types/user'
import { getUsersSelector } from 'reducers/user'
import ModalProfile from 'components/modalProfile/ModalProfile'
import { Button } from 'antd'

const ProfileManagePage = () => {
  useDocumentTitle('Manage Profiles')
  const users = useAppSelector(getUsersSelector)

  const [currentUser, setCurrentUser] = useState<User>(users[0])
  const [currentCount, setCurrentCount] = useState<number>(0)
  const [visible, setVisible] = useState(false)

  const selectUser = (user: User, count: number) => {
    setCurrentUser(user)
    setCurrentCount(count)
    setVisible(true)
  }

  return (
    <>
      <p>Manage Profile</p>
      {users.map((user, count) => {
        count++
        return (
          <div key={user.user_id}>
            <Button type="primary" onClick={() => selectUser(user, count)}>
              {user.profile}
            </Button>
          </div>
        )
      })}
      <ModalProfile
        user={currentUser}
        count={currentCount}
        users={users}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  )
}

export default ProfileManagePage
