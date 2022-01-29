import useDocumentTitle from 'hooks/useDocumentTitle'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import {
  getUsersSelector,
  deleteUserLoadingSelector,
  deleteUserErrorSelector,
  updateUserLoadingSelector,
  updateUserErrorSelector,
  removeUser,
  updateUser,
} from 'reducers/user'
import { Form, Input, Button, Checkbox } from 'antd'

const ProfileManagePage = () => {
  useDocumentTitle('Manage Profiles')
  const dispatch = useAppDispatch()
  const users = useAppSelector(getUsersSelector)
  const isLoadingDeleteUser = useAppSelector(deleteUserLoadingSelector)
  const hasErrorDeleteUser = useAppSelector(deleteUserErrorSelector)
  const isLoadingUpdateUser = useAppSelector(updateUserLoadingSelector)
  const hasErrorUpdateUser = useAppSelector(updateUserErrorSelector)

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

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
      {users.map((user, count) => {
        count++
        return (
          <div key={user.user_id}>
            <p>{user.profile}</p>
            <Form
              name="basic"
              initialValues={{ username: user.profile }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Type new profile name' }]}
              >
                <Input value={'lol'} />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Rename</Button>
              </Form.Item>
            </Form>
            {count !== 1 && (
              <Button onClick={() => deleteProfile(user.user_id)}>
                Delete
              </Button>
            )}
          </div>
        )
      })}
    </>
  )
}

export default ProfileManagePage
