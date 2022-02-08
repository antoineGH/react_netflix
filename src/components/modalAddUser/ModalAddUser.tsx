import { useState, useEffect } from 'react'
import { Modal, Input, Alert, Form } from 'antd'
import { Users } from 'types/user'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import {
  addUsersErrorSelector,
  addUsersLoadingSelector,
  unsetErrorAdd,
  addUser,
} from 'reducers/user'
import { getAccountIDSelector } from 'reducers/account'

interface props {
  users: Users
  visible: boolean
  setVisible: (bool: boolean) => void
}

const ModalAddUser = ({ users, visible, setVisible }: props) => {
  const [profileToAdd, setProfileToAdd] = useState('')
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()

  const accountID = useAppSelector(getAccountIDSelector)
  const isLoadingAddUser = useAppSelector(addUsersLoadingSelector)
  const hasErrorAddUser = useAppSelector(addUsersErrorSelector)

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
    setTimeout(() => {
      setVisible(false)
    }, 700)
  }

  return (
    <Modal
      title="Create Profile"
      centered
      visible={visible}
      okText="Create"
      okButtonProps={{
        loading: isLoadingAddUser,
      }}
      onOk={() => createUser(profileToAdd)}
      onCancel={() => setVisible(false)}
      width={1000}
    >
      {error && <Alert message={error} type="error" />}

      <Form
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
            placeholder=""
            onChange={handleChange}
            value={profileToAdd}
            disabled={isLoadingAddUser}
            onPressEnter={() => createUser(profileToAdd)}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default ModalAddUser
