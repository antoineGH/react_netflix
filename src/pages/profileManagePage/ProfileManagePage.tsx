import useDocumentTitle from 'hooks/useDocumentTitle'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import user, {
  getUsersSelector,
  getUsersLoadingSelector,
  getUsersErrorSelector,
  loadUsers,
  deleteUserLoadingSelector,
  deleteUserErrorSelector,
  removeUser,
  updateUser,
} from 'reducers/user'
import { Button } from 'antd'

const ProfileManagePage = () => {
  useDocumentTitle('Manage Profiles')
  const dispatch = useAppDispatch()
  const users = useAppSelector(getUsersSelector)
  const isLoadingUsers = useAppSelector(getUsersLoadingSelector)
  const hasErrorUsers = useAppSelector(getUsersErrorSelector)
  const isLoadingDeleteUser = useAppSelector(deleteUserLoadingSelector)
  const hasErrorDeleteUser = useAppSelector(deleteUserErrorSelector)

  useEffect(() => {
    console.log('useEffect ProfileManagePage')
    dispatch(loadUsers())
  }, [dispatch])

  const deleteProfile = (userID: number) => {
    if (users.length <= 1) {
      console.log('Impossible to delete last profile')
      return
    }
    console.log(`dispatch remove profile with userID:${userID}`)
    dispatch(removeUser(userID))
  }

  const updateProfile = (userID: number) => {
    const newProfile = 'Antoine'
    let hasExistingProfile = false
    users.forEach(user => {
      if (user.profile === newProfile) {
        hasExistingProfile = true
      }
    })
    if (hasExistingProfile) {
      console.log('Already existing profile name')
      return
    }
    console.log(`dispatch update profile with userID:${userID}`)
    dispatch(updateUser({ profile: newProfile, userID }))
  }

  return (
    <>
      <p>Manage Profile</p>
      {hasErrorUsers ? (
        <p>Error Profiles</p>
      ) : isLoadingUsers ? (
        <p>Loading Profiles</p>
      ) : (
        users.map((user, count) => {
          count++
          return (
            <div key={user.user_id}>
              <p>{user.profile}</p>
              <Button onClick={() => updateProfile(user.user_id)}>
                Rename
              </Button>
              {count !== 1 && (
                <Button onClick={() => deleteProfile(user.user_id)}>
                  Delete
                </Button>
              )}
            </div>
          )
        })
      )}
    </>
  )
}

export default ProfileManagePage
