import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import {
  getUsersErrorSelector,
  getUsersLoadingSelector,
  getUsersSelector,
  loadUsers,
  selectUser,
} from 'reducers/user'
import { Button } from 'antd'

const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch])

  const users = useAppSelector(getUsersSelector)
  const isLoadingUsers = useAppSelector(getUsersLoadingSelector)
  const hasErrorUsers = useAppSelector(getUsersErrorSelector)

  const handleClick = () => {
    dispatch(selectUser(users[0].user_id))
    navigate('/auth/profiles')
  }

  return (
    <>
      <p>Profile Page</p>
      {hasErrorUsers ? (
        <p>Error Users</p>
      ) : isLoadingUsers ? (
        <p>Loading Users</p>
      ) : (
        users.map(user => {
          return (
            <Button
              key={user.user_id}
              onClick={() => dispatch(selectUser(user.user_id))}
            >
              {user.profile}
            </Button>
          )
        })
      )}

      <Button onClick={handleClick}>Manage Profiles</Button>
    </>
  )
}

export default ProfilePage
