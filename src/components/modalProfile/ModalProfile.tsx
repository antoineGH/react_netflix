import { useState, useEffect } from 'react'
import { Modal, Button, Alert } from 'antd'
import { User, Users } from 'types/user'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import {
  removeUser,
  updateUser,
  deleteUserLoadingSelector,
  deleteUserErrorSelector,
  updateUserLoadingSelector,
  updateUserErrorSelector,
} from 'reducers/user'

interface props {
  user: User
  count: number
  users: Users
  visible: boolean
  setVisible: (bool: boolean) => void
}

const ModalProfile = ({ user, count, users, visible, setVisible }: props) => {
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string | null>(null)
  const isLoadingDeleteUser = useAppSelector(deleteUserLoadingSelector)
  const hasErrorDeleteUser = useAppSelector(deleteUserErrorSelector)
  const isLoadingUpdateUser = useAppSelector(updateUserLoadingSelector)
  const hasErrorUpdateUser = useAppSelector(updateUserErrorSelector)

  useEffect(() => {
    if (hasErrorUpdateUser) {
      setError('Impossible to update profile')
    }
    if (hasErrorUpdateUser) {
      setError('Impossible to delete profile')
    }
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }, [hasErrorUpdateUser, hasErrorDeleteUser, error])

  const deleteProfile = (userID: number) => {
    if (users.length <= 1) {
      setError('Impossible to delete default profile')
      return
    }
    dispatch(removeUser(userID))
    setVisible(false)
  }

  const updateProfile = (userID: number, newProfile: string) => {
    let hasExistingProfile = false
    users.forEach(user => {
      if (user.profile === newProfile) {
        hasExistingProfile = true
      }
    })
    if (hasExistingProfile) {
      setError('Profile already existing, choose a different name')
      return
    }
    dispatch(updateUser({ userID, profile: newProfile }))
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
      <p>{user.profile}</p>
      {count !== 1 && (
        <Button
          loading={isLoadingDeleteUser}
          onClick={() => deleteProfile(user.user_id)}
        >
          Delete
        </Button>
      )}
      <Button
        loading={isLoadingUpdateUser}
        onClick={() => updateProfile(user.user_id, 'Antoine')}
      >
        Rename
      </Button>
    </Modal>
  )
}
export default ModalProfile
