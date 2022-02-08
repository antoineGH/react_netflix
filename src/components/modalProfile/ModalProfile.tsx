import { useState, useEffect } from 'react'
import { Modal, Button, Alert, Form, Input } from 'antd'
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
  const [profileToUpdate, setProfileToUpdate] = useState(user.profile)
  const isLoadingDeleteUser = useAppSelector(deleteUserLoadingSelector)
  const hasErrorDeleteUser = useAppSelector(deleteUserErrorSelector)
  const isLoadingUpdateUser = useAppSelector(updateUserLoadingSelector)
  const hasErrorUpdateUser = useAppSelector(updateUserErrorSelector)

  const [form] = Form.useForm()

  useEffect(() => form.resetFields(), [user.profile, form])

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

  useEffect(() => {
    setProfileToUpdate(user.profile)
    form.setFieldsValue({
      profile: user.profile,
    })
  }, [user.profile, form])

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
    setProfileToUpdate('')
    setTimeout(() => {
      setVisible(false)
    }, 700)
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setProfileToUpdate(e.currentTarget.value)
  }

  return (
    <Modal
      getContainer={false}
      title="Profile Settings"
      centered
      visible={visible}
      okText="Update"
      okButtonProps={{
        loading: isLoadingUpdateUser,
      }}
      onOk={() => updateProfile(user.user_id, profileToUpdate)}
      onCancel={() => setVisible(false)}
      width={1000}
    >
      {error && <Alert message={error} type="error" />}

      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
      >
        <Form.Item
          label="Profile"
          name="profile"
          rules={[
            { required: true, message: 'Please input your profile name' },
            {
              pattern: /^[a-zA-Z]+$/,
              message: "Profile name shouldn't contain spaces or numbers",
            },
            {
              min: 3,
              message: 'Profile name should contain at least 3 characters',
            },
            { max: 15, message: "Profile name shouldn't exceed 15 characters" },
          ]}
        >
          <Input
            id="input"
            name="input"
            onChange={handleChange}
            placeholder={profileToUpdate}
            disabled={isLoadingUpdateUser}
            onPressEnter={() => updateProfile(user.user_id, profileToUpdate)}
          />
        </Form.Item>
      </Form>

      {count !== 1 && (
        <Button
          loading={isLoadingDeleteUser}
          onClick={() => deleteProfile(user.user_id)}
        >
          Delete
        </Button>
      )}
    </Modal>
  )
}
export default ModalProfile
